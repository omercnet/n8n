/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */

import { genSaltSync, hashSync } from 'bcryptjs';
import express = require('express');
import validator from 'validator';
import { LoggerProxy } from 'n8n-workflow';

import { Db, ResponseHelper } from '../..';
import { issueCookie } from '../auth/jwt';
import { N8nApp, PublicUser } from '../Interfaces';
import { validatePassword, sanitizeUser } from '../UserManagementHelper';
import type { AuthenticatedRequest, MeRequest } from '../../requests';
import { validateEntity } from '../../GenericHelpers';
import { User } from '../../databases/entities/User';
import { getLogger } from '../../Logger';

LoggerProxy.init(getLogger());

export function meNamespace(this: N8nApp): void {
	/**
	 * Return the logged-in user.
	 */
	this.app.get(
		`/${this.restEndpoint}/me`,
		ResponseHelper.send(async (req: AuthenticatedRequest): Promise<PublicUser> => {
			return sanitizeUser(req.user);
		}),
	);

	/**
	 * Update the logged-in user's settings, except password.
	 */
	this.app.patch(
		`/${this.restEndpoint}/me`,
		ResponseHelper.send(
			async (req: MeRequest.Settings, res: express.Response): Promise<PublicUser> => {
				if (!req.body.email) {
					LoggerProxy.error('Email not found in payload at PATCH /me', { userId: req.user.id });
					throw new ResponseHelper.ResponseError('Email is mandatory', undefined, 400);
				}

				if (!validator.isEmail(req.body.email)) {
					LoggerProxy.error('Invalid email in payload at PATCH /me', {
						userId: req.user.id,
						email: req.body.email,
					});
					throw new ResponseHelper.ResponseError('Invalid email address', undefined, 400);
				}

				const newUser = new User();

				Object.assign(newUser, req.user, req.body);

				await validateEntity(newUser);

				const user = await Db.collections.User!.save(newUser);

				LoggerProxy.debug('User saved successfully at PATCH /me', { userId: user.id });

				await issueCookie(res, user);

				return sanitizeUser(user);
			},
		),
	);

	/**
	 * Update the logged-in user's password.
	 */
	this.app.patch(
		`/${this.restEndpoint}/me/password`,
		ResponseHelper.send(async (req: MeRequest.Password, res: express.Response) => {
			const validPassword = validatePassword(req.body.password);
			req.user.password = hashSync(validPassword, genSaltSync(10));

			const user = await Db.collections.User!.save(req.user);

			LoggerProxy.debug('User password saved successfully at PATCH /me/password', {
				userId: user.id,
			});

			await issueCookie(res, user);

			return { success: true };
		}),
	);

	/**
	 * Store the logged-in user's survey answers.
	 */
	this.app.post(
		`/${this.restEndpoint}/me/survey`,
		ResponseHelper.send(async (req: MeRequest.SurveyAnswers) => {
			const { body: personalizationAnswers } = req;

			if (!personalizationAnswers) {
				LoggerProxy.error('Empty survey in payload at PATCH /me/survey', { userId: req.user.id });
				throw new ResponseHelper.ResponseError(
					'Personalization answers are mandatory',
					undefined,
					400,
				);
			}

			await Db.collections.User!.save({
				id: req.user.id,
				personalizationAnswers,
			});

			LoggerProxy.debug('User survey saved successfully at POST /me/survey', {
				userId: req.user.id,
			});

			return { success: true };
		}),
	);
}