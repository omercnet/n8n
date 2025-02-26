import {
	INodeProperties,
} from 'n8n-workflow';

export const channelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'channel',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a channel',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a channel',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a channel',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all channels',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a channel',
			},
		],
		default: 'create',
	},
];

export const channelFields: INodeProperties[] = [

	/* -------------------------------------------------------------------------- */
	/*                                 channel:create                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Team ID',
		name: 'teamId',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTeams',
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Name',
		name: 'name',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
		description: 'Channel name as it will appear to the user in Microsoft Teams',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'channel',
				],
			},
		},
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: `channel's description`,
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Private',
						value: 'private',
					},
					{
						name: 'Standard',
						value: 'standard',
					},
				],
				default: 'standard',
				description: 'The type of the channel',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 channel:delete                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Team ID',
		name: 'teamId',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTeams',
		},
		displayOptions: {
			show: {
				operation: [
					'delete',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getChannels',
			loadOptionsDependsOn: [
				'teamId',
			],
		},
		displayOptions: {
			show: {
				operation: [
					'delete',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 channel:get                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Team ID',
		name: 'teamId',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTeams',
		},
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getChannels',
			loadOptionsDependsOn: [
				'teamId',
			],
		},
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 channel:getAll                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Team ID',
		name: 'teamId',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTeams',
		},
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 channel:update                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Team ID',
		name: 'teamId',
		required: true,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTeams',
		},
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getChannels',
			loadOptionsDependsOn: [
				'teamId',
			],
		},
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'channel',
				],
			},
		},
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Channel name as it will appear to the user in Microsoft Teams',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: `channel's description`,
			},
		],
	},
];
