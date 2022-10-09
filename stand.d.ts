/** @noSelfInFile **/

/** @compileMembersOnly */
declare enum CommandPermission {
    COMMANDPERM_FRIENDLY,
    COMMANDPERM_NEUTRAL,
    COMMANDPERM_SPAWN,
    COMMANDPERM_RUDE,
    COMMANDPERM_AGGRESSIVE,
    COMMANDPERM_TOXIC,
    COMMANDPERM_USERONLY
}

/** @compileMembersOnly */
declare enum ClickType {
    CLICK_MENU,
    CLICK_COMMAND,
    CLICK_HOTKEY,
    CLICK_BULK,
    CLICK_AUTO,
    CLICK_SCRIPTED,
    CLICK_WEB,
    CLICK_WEB_COMMAND,
    CLICK_CHAT_ALL,
    CLICK_CHAT_TEAM
}

/** @compileMembersOnly */
declare enum ClickFlag {
    CLICK_FLAG_AUTO,
    CLICK_FLAG_CHAT,
    CLICK_FLAG_WEB
}

interface CommandRef extends CommandUniqPtr {
    isValid: () => boolean,
    refByRelPath: () => CommandRef
    delete: () => void
    detach: () => void
    attach: (parent: CommandRef) => CommandRef
    attachBefore: (parent: CommandRef) => CommandRef
    attachAfter: (parent: CommandRef) => CommandRef
    focus: () => void
    getApplicablePlayers: (includeUser?: boolean) => Record<number, number>
    visible: boolean
    value: number
    min_value: number
    max_value: number
    step_size: number
    list: (menu_name: Label, command_names: string[], help_text: Label, on_click?: Function, on_back?: Function) => CommandRef | CommandUniqPtr
	/** perm may be any of: **/
	action: (menu_name: Label, command_names: string[], help_text: Label, on_click: Function, on_command?: Function, syntax?: string, perm?: int) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with on and click_type. **/
	toggle: (menu_name: Label, command_names: string[], help_text: Label, on_change: Function, default_on: boolean) => CommandRef | CommandUniqPtr
	/** Your on_tick function will be called every tick that the toggle is checked; you should not call util.yield in this context. **/
	toggle_loop: (menu_name: Label, command_names: string[], help_text: Label, on_tick: Function, on_stop?: Function) => CommandRef | CommandUniqPtr
	slider: (menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_change: Function) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with value, prev_value and click_type. **/
	slider_float: (menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_change: Function) => CommandRef | CommandUniqPtr
	click_slider: (menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_click: Function) => CommandRef | CommandUniqPtr
	/** Your on_click function will be called with value and click_type. **/
	click_slider_float: (menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_click: Function) => CommandRef | CommandUniqPtr
	/** options must be table of list action item data or Label. List action item data is a table that contains at least a Label (menu_name), and can optionally have command_names and help_text. **/
	list_select: (menu_name: Label, command_names: string[], help_text: Label, options: any[], default_value: int, on_change: Function) => CommandRef | CommandUniqPtr
	/** options must be table of list action item data or Label. List action item data is a table that contains at least a Label (menu_name), and can optionally have command_names and help_text. **/
	list_action: (menu_name: Label, command_names: string[], help_text: Label, options: any[], on_item_click: Function) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with the string and click type. **/
	text_input: (menu_name: Label, command_names: string[], help_text: Label, on_change: Function, default_value: string) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with a Colour as parameter. **/
	colour: ColourMenuClassMethod
	/** Your on_change function will be called with a Colour as parameter. **/
	/** Creates a rainbow slider for the given colour command. This should be called right after creating the colour command. **/
	rainbow: () => CommandRef | CommandUniqPtr
	divider: (menu_name: Label) => CommandRef | CommandUniqPtr
	/** Pairs well with menu.on_tick_in_viewport and menu.set_value. **/
	readonly: (menu_name: Label, value: string) => CommandRef | CommandUniqPtr
	hyperlink: (menu_name: Label, link: string, help_text: Label) => CommandRef | CommandUniqPtr
	/** We highly recommend using menu.list_action instead of this, unless the options are really unimportant. **/
	action_slider: (menu_name: Label, command_names: string[], help_text: Label, options: Label[], on_click: Function) => CommandRef | CommandUniqPtr
	/** We highly recommend using menu.list_select instead of this, unless the options are really unimportant. **/
	slider_text: (menu_name: Label, command_names: string[], help_text: Label, options: Label[], on_click: Function) => CommandRef | CommandUniqPtr
}

interface CommandUniqPtr {
    menu_name: string
    command_names: string[]
    help_text: string
}

type Label = string

interface Colour {
    r: number,
    g: number,
    b: number,
    a: number
}

// Function overloads:

type NewV3 = (x: float, y: float, z: float) => any 
    | ((pos: Vector3) => any)
    | (() => any)

type ColourMenu = (parent: CommandRef, menu_name: Label, command_names: LuaTable<any, string>, help_text: Label, defaultValue: Colour, transparency: boolean, on_change: Function) => CommandRef | CommandUniqPtr
    | ((parent: CommandRef, menu_name: Label, command_names: LuaTable<any, string>, help_text: Label, default_r: number, default_g: number, default_b: number, default_a: number, transparency: boolean, on_change: Function) => CommandRef | CommandUniqPtr)
type ColourMenuClassMethod = (menu_name: Label, command_names: LuaTable<any, string>, help_text: Label, defaultValue: Colour, transparency: boolean, on_change: Function) => CommandRef | CommandUniqPtr
| ((menu_name: Label, command_names: LuaTable<any, string>, help_text: Label, default_r: number, default_g: number, default_b: number, default_a: number, transparency: boolean, on_change: Function) => CommandRef | CommandUniqPtr)

type SendSMS = (recipient: int, text: string) => void
    | ((recipient: int, sender: int, text: string) => void)

type DrawTexture = (id: int, sizeX: number, sizeY: number, centerX: number, centerY: number, posX: number, posY: number, rotation: number, colour: Colour) => void
    | ((id: int, sizeX: number, sizeY: number, centerX: number, centerY: number, posX: number, posY: number, rotation: number, r: number, g: number, b: number, a: number) => void)

type DrawLine = (x1: number, y1: number, x2: number, y2: number, colour: Colour) => void
| ((x1: number, y1: number, x2: number, y2: number, colour1: Colour, colour2: Colour) => void)

/** @noSelf **/
declare let menu: {
	/** Returns a reference to the list that your script gets when it is started. **/
	my_root: (this: void) => CommandRef
	/** Returns a reference to the list that the given player owns. **/
	player_root: (this: void, player_id: int) => CommandRef
	/** Using return value of this function to create a command produces a detached commmand (CommandUniqPtr) instead of a CommandRef. **/
	shadow_root: (this: void) => CommandRef
	/** Returns a reference to any command in Stand using a path such as Self>Immortality. Note that the path has to be in English (UK) and using the no-space greater-than separator. **/
	ref_by_path: (this: void, path: string, tree_version?: int) => CommandRef
	ref_by_rel_path: (this: void, base: int, path: string) => CommandRef
	ref_by_command_name: (this: void, command_name: string) => CommandRef
	list: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_click?: Function, on_back?: Function) => CommandRef | CommandUniqPtr
	/** perm may be any of: **/
	action: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_click: Function, on_command?: Function, syntax?: string, perm?: int) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with on and click_type. **/
	toggle: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_change: Function, default_on: boolean) => CommandRef | CommandUniqPtr
	/** Your on_tick function will be called every tick that the toggle is checked; you should not call util.yield in this context. **/
	toggle_loop: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_tick: Function, on_stop?: Function) => CommandRef | CommandUniqPtr
	slider: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_change: Function) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with value, prev_value and click_type. **/
	slider_float: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_change: Function) => CommandRef | CommandUniqPtr
	click_slider: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_click: Function) => CommandRef | CommandUniqPtr
	/** Your on_click function will be called with value and click_type. **/
	click_slider_float: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_click: Function) => CommandRef | CommandUniqPtr
	/** options must be table of list action item data or Label. List action item data is a table that contains at least a Label (menu_name), and can optionally have command_names and help_text. **/
	list_select: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: any[], default_value: int, on_change: Function) => CommandRef | CommandUniqPtr
	/** options must be table of list action item data or Label. List action item data is a table that contains at least a Label (menu_name), and can optionally have command_names and help_text. **/
	list_action: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: any[], on_item_click: Function) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with the string and click type. **/
	text_input: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_change: Function, default_value: string) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with a Colour as parameter. **/
	colour: ColourMenu
	/** Your on_change function will be called with a Colour as parameter. **/
	/** Creates a rainbow slider for the given colour command. This should be called right after creating the colour command. **/
	rainbow: (this: void, colour_command: CommandRef) => CommandRef | CommandUniqPtr
	divider: (this: void, parent: CommandRef, menu_name: Label) => CommandRef | CommandUniqPtr
	/** Pairs well with menu.on_tick_in_viewport and menu.set_value. **/
	readonly: (this: void, parent: CommandRef, menu_name: Label, value: string) => CommandRef | CommandUniqPtr
	hyperlink: (this: void, parent: CommandRef, menu_name: Label, link: string, help_text: Label) => CommandRef | CommandUniqPtr
	/** We highly recommend using menu.list_action instead of this, unless the options are really unimportant. **/
	action_slider: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: Label[], on_click: Function) => CommandRef | CommandUniqPtr
	/** We highly recommend using menu.list_select instead of this, unless the options are really unimportant. **/
	slider_text: (this: void, parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: Label[], on_click: Function) => CommandRef | CommandUniqPtr
	_delete: (this: void, command: CommandRef) => void
	replace: (this: void, old: CommandRef, newValue: CommandUniqPtr) => CommandRef
	detach: (this: void, command: CommandRef) => CommandUniqPtr
	attach: (this: void, parent: CommandRef, command: CommandUniqPtr) => CommandRef
	attach_after: (this: void, anchor: CommandRef, command: CommandUniqPtr) => CommandRef
	attach_before: (this: void, anchor: CommandRef, command: CommandUniqPtr) => CommandRef
	/** Returns if the referenced command still exists. **/
	is_ref_valid: (this: void, ref: CommandRef) => void
	focus: (this: void, command: CommandRef) => void
	get_applicable_players: (this: void, command: CommandRef, include_user?: boolean) => int[]
	/** Removes invalidated weakrefs from an internal vector. Stand does this automatically, but if you bulk-delete-or-replace commands, you might want to call this right after. **/
	collect_garbage: (this: void) => int
	is_open: (this: void) => boolean
	/** Returns the menu grid origin x & y. **/
	get_position: (this: void) => LuaMultiReturn<[number,  number]>
	/** Returns x, y, width, & height for the current main view (active list, warning, etc.). **/
	get_main_view_position_and_size: (this: void) => LuaMultiReturn<[number,  number,  number,  number]>
	get_active_list_cursor_text: (this: void, even_when_disabled: boolean, even_when_inappropriate: boolean) => string
	are_tabs_visible: (this: void) => boolean
	show_command_box: (this: void, prefill: string) => void
	show_command_box_click_based: (this: void, click_type: int, prefill: string) => void
	trigger_commands: (this: void, input: string) => void
	trigger_command: (this: void, command: CommandRef, arg: string) => void
	command_box_is_open: (this: void) => boolean
	/** Returns x, y, width, & height. **/
	command_box_get_dimensions: (this: void) => LuaMultiReturn<[number,  number,  number,  number]>
	is_in_screenshot_mode: (this: void) => boolean
	on_tick_in_viewport: (this: void, command: CommandRef, callback: Function) => int
	on_focus: (this: void, command: CommandRef, callback: Function) => int
	on_blur: (this: void, command: CommandRef, callback: Function) => int
	remove_handler: (this: void, command: CommandRef, handler_id: int) => void
	/** You might want to use lang.get_string on the return value. **/
	get_menu_name: (this: void, command: CommandRef | CommandUniqPtr) => Label
	get_command_names: (this: void, command: CommandRef | CommandUniqPtr) => string[]
	/** You might want to use lang.get_string on the return value. **/
	get_help_text: (this: void, command: CommandRef | CommandUniqPtr) => Label
	get_visible: (this: void, command: CommandRef) => boolean
	get_value: (this: void, command: CommandRef) => int | boolean | string
	get_min_value: (this: void, command: CommandRef) => int
	get_max_value: (this: void, command: CommandRef) => int
	get_step_size: (this: void, command: CommandRef) => int
	get_state: (this: void, command: CommandRef) => string
	get_default_state: (this: void, command: CommandRef) => string
	set_menu_name: (this: void, command: CommandRef | CommandUniqPtr, menu_name: Label) => void
	set_command_names: (this: void, command: CommandRef | CommandUniqPtr, command_names: string[]) => void
	set_help_text: (this: void, command: CommandRef | CommandUniqPtr, help_text: Label) => void
	set_visible: (this: void, command: CommandRef, visible: boolean) => void
	set_value: (this: void, command: CommandRef, value: int | boolean | string) => void
	set_min_value: (this: void, command: CommandRef, min_value: int) => void
	set_max_value: (this: void, command: CommandRef, max_value: int) => void
	set_step_size: (this: void, command: CommandRef, step_size: int) => void
	/** Also works for list_select. **/
	set_list_action_options: (this: void, command: CommandRef, options: any[]) => void
	/** Also works for slider_text. **/
	set_action_slider_options: (this: void, command: CommandRef, options: Label[]) => void
	/** skippable will not have an effect when "Force Me To Read Warnings" is disabled. **/
	show_warning: (this: void, command: CommandRef, click_type: int, message: string, proceed_callback: Function, cancel_callback?: Function, skippable?: boolean) => void
	/** Returns a 32-bit integer derived from the user's activation key. 0 if no activation key. **/
	get_activation_key_hash: (this: void) => int
	/** Returns a value between 0 and 3 depending on the user's edition. **/
	get_edition: (this: void) => int
}

/** @noSelf **/
declare let players: {
	/** Registers a function to be called when a player joins the session. Your callback will be called with the player id as argument. **/
	on_join: (this: void, callback: Function) => int
	/** Registers a function to be called when a player leaves the session. Your callback will be called with the player id and name as arguments. **/
	on_leave: (this: void, callback: Function) => int
	/** Calls your join handler(s) for every player that is already in the session. **/
	dispatch_on_join: (this: void) => void
	/** Checks if a player with the given id is in session. **/
	exists: (this: void, player_id: int) => boolean
	/** Alternative to the PLAYER.PLAYER_ID native. **/
	user: (this: void) => int
	/** Alternative to the PLAYER.PLAYER_PED_ID native. **/
	user_ped: (this: void) => int
	/** Returns an index-based table with all matching player ids. **/
	list: (this: void, include_user: boolean, include_friends: boolean, include_strangers: boolean) => int[]
	/** Like players.list but using Players > All Players > Excludes. **/
	list_all_with_excludes: (this: void, include_user: boolean) => int[]
	get_host: (this: void) => int
	get_script_host: (this: void) => int
	/** Returns an index-based table containing the ids of all players focused in the menu. **/
	get_focused: (this: void) => int[]
	get_name: (this: void, player_id: int) => string
	/** This value might be spoofed by hard RID spoofing. **/
	get_rockstar_id: (this: void, player_id: int) => int
	/** This value might be spoofed by soft RID spoofing. **/
	get_rockstar_id_2: (this: void, player_id: int) => int
	get_connect_ip: (this: void, player_id: int) => int
	get_connect_port: (this: void, player_id: int) => int
	get_online_ip: (this: void, player_id: int) => int
	get_online_port: (this: void, player_id: int) => int
	get_rank: (this: void, player_id: int) => int
	get_rp: (this: void, player_id: int) => int
	get_money: (this: void, player_id: int) => int
	get_wallet: (this: void, player_id: int) => int
	get_bank: (this: void, player_id: int) => int
	get_kd: (this: void, player_id: int) => number
	get_kills: (this: void, player_id: int) => int
	get_deaths: (this: void, player_id: int) => int
	/** Returns the same as the LOCALIZATION.GET_CURRENT_LANGUAGE native. **/
	get_language: (this: void, player_id: int) => int
	is_using_controller: (this: void, player_id: int) => boolean
	get_name_with_tags: (this: void, player_id: int) => string
	get_tags_string: (this: void, player_id: int) => string
	is_godmode: (this: void, player_id: int) => boolean
	/** Returns true if the player has the "Modder" tag. **/
	is_marked_as_modder: (this: void, player_id: int) => boolean
	/** Returns true if the player has the "Modder or Admin" tag. **/
	is_marked_as_modder_or_admin: (this: void, player_id: int) => boolean
	/** Returns true if the player has the "Admin" tag. **/
	is_marked_as_admin: (this: void, player_id: int) => boolean
	is_marked_as_attacker: (this: void, player_id: int) => boolean
	is_otr: (this: void, player_id: int) => boolean
	is_in_interior: (this: void, player_id: int) => boolean
	/** Returns the player's host token as a decimal string. **/
	get_host_token: (this: void, player_id: int) => string
	/** Returns the player's host token as a 16-character padded hex string. **/
	get_host_token_hex: (this: void, player_id: int) => string
	/** Returns -1 if not applicable. **/
	get_boss: (this: void, player_id: int) => int
	/** Returns -1 if not applicable. **/
	get_org_colour: (this: void, player_id: int) => int
	clan_get_motto: (this: void, player_id: int) => string
	/** Works correctly at all distances. **/
	get_position: (this: void, player_id: int) => any
	/** Works at all distances, but best when the user is close to them. **/
	get_vehicle_model: (this: void, player_id: int) => int
	send_sms: SendSMS
	get_cam_pos: (this: void, player_id: int) => Vector3
	get_cam_rot: (this: void, player_id: int) => Vector3
}

/** @noSelf **/
declare let entities: {
	/** A wrapper for the PED.CREATE_PED native. **/
	create_ped: (this: void, type: int, hash: int, pos: Vector3, heading: number) => int
	/** A wrapper for the VEHICLE.CREATE_VEHICLE native. **/
	create_vehicle: (this: void, hash: int, pos: Vector3, heading: number) => int
	/** A wrapper for the OBJECT.CREATE_OBJECT_NO_OFFSET native. **/
	create_object: (this: void, hash: int, pos: Vector3) => int
	/** Returns the user's current vehicle, last driven vehicle, or 0. **/
	get_user_vehicle_as_handle: (this: void) => int
	get_user_vehicle_as_pointer: (this: void) => int
	get_user_personal_vehicle_as_handle: (this: void) => int
	/** Returns the address of the entity with the given script handle. **/
	handle_to_pointer: (this: void, handle: int) => int
	/** Returns a script handle for the entity with the given address. This will force one to be allocated. Note that script handles are a limited resource. **/
	pointer_to_handle: (this: void, addr: int) => int
	/** This will force a script handle to be allocated for all vehicles. Note that script handles are a limited resource. **/
	get_all_vehicles_as_handles: (this: void) => int[]
	get_all_vehicles_as_pointers: (this: void) => int[]
	/** This will force a script handle to be allocated for all peds. Note that script handles are a limited resource. **/
	get_all_peds_as_handles: (this: void) => int[]
	get_all_peds_as_pointers: (this: void) => int[]
	/** This will force a script handle to be allocated for all objects. Note that script handles are a limited resource. **/
	get_all_objects_as_handles: (this: void) => int[]
	get_all_objects_as_pointers: (this: void) => int[]
	/** This will force a script handle to be allocated for all pickups. Note that script handles are a limited resource. **/
	get_all_pickups_as_handles: (this: void) => int[]
	get_all_pickups_as_pointers: (this: void) => int[]
	delete_by_handle: (this: void, handle: int) => void
	delete_by_pointer: (this: void, addr: int) => void
	get_model_hash: (this: void, addr: int) => int
	/** The result might be less precise than the native counterpart. **/
	get_position: (this: void, addr: int) => Vector3
	/** The result might be less precise than the native counterpart. **/
	get_rotation: (this: void, addr: int) => Vector3
	get_health: (this: void, addr: int) => number
	/** Only applicable to vehicles. **/
	get_current_gear: (this: void, addr: int) => int
	/** Only applicable to vehicles. **/
	set_current_gear: (this: void, addr: int, current_gear: int) => void
	/** Only applicable to vehicles. **/
	get_next_gear: (this: void, addr: int) => int
	/** Only applicable to vehicles. **/
	set_next_gear: (this: void, addr: int, next_gear: int) => void
	/** Only applicable to vehicles. **/
	get_rpm: (this: void, addr: int) => number
	/** Only applicable to vehicles. **/
	get_gravity: (this: void, addr: int) => number
	/** Only applicable to vehicles. **/
	set_gravity: (this: void, addr: int, gravity: number) => number
	/** Only applicable to vehicles. **/
	set_gravity_multiplier: (this: void, addr: int, gravity_multiplier: number) => number
	/** Only applicable to vehicles. Returns a value between 0.0 and 1.25. **/
	get_boost_charge: (this: void, addr: int) => number
	/** Returns a pointer or 0. **/
	get_draw_handler: (this: void, addr: int) => int
	vehicle_draw_handler_get_pearlecent_colour: (this: void, addr: int) => int
	vehicle_draw_handler_get_wheel_colour: (this: void, addr: int) => int
	get_vehicle_has_been_owned_by_player: (this: void, addr: int) => boolean
	/** Only applicable to peds. Returns a pointer or 0. **/
	get_player_info: (this: void, addr: int) => int
	player_info_get_game_state: (this: void, addr: int) => int
}

/** @noSelf **/
declare let chat: {
	/** Registers a function to be called when a chat message is sent: **/
	on_message: (this: void, callback: Function) => int
	/** As you might be aware, messages have a limit of 140 UTF-16 characters. However, that is only true for the normal input, as you can use up to 254 UTF-8 characters over the network, and many more for the local history. **/
	send_message: (this: void, text: string, team_chat: boolean, add_to_local_history: boolean, networked: boolean) => void
	/** sender will only be respected when recipient == players.user(), otherwise sender will be forced to players.user(). **/
	send_targeted_message: (this: void, recipient: int, sender: int, text: string, team_chat: boolean) => void
	/** Possible return values: **/
	get_state: (this: void) => int
	is_open: (this: void) => boolean
	open: (this: void) => void
	close: (this: void) => void
	/** Returns the message that the user is currently drafting or an empty string if not applicable. **/
	get_draft: (this: void) => string
	ensure_open_with_empty_draft: (this: void, team_chat: boolean) => void
	add_to_draft: (this: void, appendix: string) => void
	remove_from_draft: (this: void, characters: int) => void
}

/** @noSelf **/
declare let directx: {
	/** An absolute path is recommended, e.g. by using filesystem.resources_dir(). **/
	create_texture: (this: void, path: string) => int
	draw_texture: DrawTexture
	/** alignment can be any of: **/
	draw_text: (this: void, x: number, y: number, text: string, alignment: int, scale: number, colour: Colour, force_in_bounds: boolean) => void
	draw_rect: (this: void, x: number, y: number, width: number, height: number, colour: Colour) => void
	draw_line: DrawLine
	draw_triangle: (this: void, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, colour: Colour) => void
	get_client_size: (this: void) => LuaMultiReturn<[number,  number]>
	/** Returns width and height. **/
	get_text_size: (this: void, text: string, scale: number) => LuaMultiReturn<[number,  number]>
	pos_hud_to_client: (this: void, x: number, y: number) => LuaMultiReturn<[number,  number]>
	size_hud_to_client: (this: void, x: number, y: number) => LuaMultiReturn<[number,  number]>
	pos_client_to_hud: (this: void, x: number, y: number) => LuaMultiReturn<[number,  number]>
	size_client_to_hud: (this: void, x: number, y: number) => LuaMultiReturn<[number,  number]>
	blurrect_new: (this: void) => int
	/** Frees an instance. This is automatically done for all instances your script has allocated but not freed once it finishes. **/
	blurrect_free: (this: void, instance: int) => void
	/** Prefer to use 1 instance per region, as any draw with a different size requires the buffers to be reallocated. **/
	blurrect_draw: (this: void, instance: int, x: number, y: number, width: number, height: number, strength: int) => void
}

/** @noSelf **/
declare let util: {
	/** Loads the natives lib with the provided version, installing it from the repository if needed. **/
	require_natives: (this: void, version: int | string) => void
	/** Executes the given function in an OS thread to avoid holding up the game for expensive tasks like using require on a big file, creating lots of commands, or performing expensive calculations. Note that this will hold up your entire script, and calling natives or certain api functions in this context may lead to instabilities. **/
	execute_in_os_thread: (this: void, func: Function) => void
	/** Like require, but in an OS thread, to avoid holding up the game. Might not work for every library. **/
	require_no_lag: (this: void, file: string) => void
	/** Registers the parameter-function to be called every tick until it returns false. **/
	create_tick_handler: (this: void, func: Function) => void
	try_run: (this: void, func: Function) => void
	/** Prevents Stand's idle script cleanup. **/
	keep_running: (this: void) => void
	/** Pauses the execution of the calling thread until the next tick or in wake_in_ms milliseconds. **/
	yield: (this: void, wake_in_ms?: int) => void
	/** Creates the kind of thread that your script gets when it is created, or one of your callbacks is invoked, which is just another coroutine that gets resumed every tick and is expected to yield or return. **/
	create_thread: (...arguments: any) => void
	/** Stops the calling thread. **/
	stop_thread: (this: void) => void
	restart_script: (this: void) => void
	stop_script: (this: void) => void
	/** Called in the final tick of your script. Yielding or creating threads in that context is undefined behaviour. **/
	on_stop: (this: void, func: Function) => void
	/** Possible bitflags: **/
	toast: (this: void, message: string, bitflags: int) => void
	/** Alias for  **/
	log: (this: void, message: string) => void
	/** Draws the given text at the top left of the screen using the menu colour for the current frame. **/
	draw_debug_text: (this: void, text: string) => void
	/** Shorthand for **/
	show_corner_help: (this: void, message: string) => void
	/** Shorthand for **/
	replace_corner_help: (this: void, message: string, replacement_message: string) => void
	/** Replacement for **/
	set_local_player_wanted_level: (this: void, wanted_level: int, no_drop: boolean) => void
	/** JOAAT stands for Jenkins One At A Time which is the name of the hashing algorithm used pretty much everywhere in GTA. **/
	joaat: (this: void, text: string) => int
	/** Returns an empty string if the given hash is not found in Stand's dictionaries. **/
	reverse_joaat: (this: void, hash: int) => string
	is_this_model_a_blimp: (this: void, model: int | string) => boolean
	is_this_model_an_object: (this: void, model: int | string) => boolean
	is_this_model_a_submarine: (this: void, model: int | string) => boolean
	is_this_model_a_trailer: (this: void, model: int | string) => boolean
	/** Returns an index-based table with a table for each vehicle in the game. The inner tables contain name and manufacturer. **/
	get_vehicles: (this: void) => any[]
	/** Returns an index-based table with a table for each weapon in the game. The inner tables contain hash, label_key, category, & category_id. Note that the categories are specific to Stand. **/
	get_weapons: (this: void) => any[]
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_DISPLAY_TEXT: (this: void, message: string) => void
	/** Replacement for **/
	_BEGIN_TEXT_COMMAND_LINE_COUNT: (this: void, message: string) => void
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_IS_THIS_HELP_MESSAGE_BEING_DISPLAYED: (this: void, message: string) => void
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_DISPLAY_HELP: (this: void, message: string) => void
	/** Replacement for **/
	_BEGIN_TEXT_COMMAND_GET_WIDTH: (this: void, message: string) => void
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_THEFEED_POST: (this: void, message: string) => void
	get_rp_required_for_rank: (this: void, rank: int) => int
	get_session_players_bitflag: (this: void) => int
	/** session_player_bitflags has a bit set to 1 for every player that should receive the script event; you can use util.get_session_players_bitflag() if you intend for everyone to receive the script event or use 1 << player_id to target individual players. **/
	trigger_script_event: (this: void, session_player_bitflags: int, data: LuaTable<any, int>) => void
	current_time_millis: (this: void) => int
	/** Returns how many seconds have passed since the UNIX epoch (00:00:00 UTC on 1 January 1970). **/
	current_unix_time_seconds: (this: void) => int
	remove_handler: (this: void, handler_id: int) => int
	is_session_started: (this: void) => boolean
	is_session_transition_active: (this: void) => boolean
	get_char_slot: (this: void) => int
	/** The most precise way to get the ground Z coordinate which respects water. **/
	get_ground_z: (this: void, x: number, y: number, z_hint: number) => LuaMultiReturn<[boolean,  number]>
	/** If the provided script is not running, your function is not called and this returns false. **/
	spoof_script: (this: void, script: string | int, func: Function) => boolean
	remove_blip: (this: void, blip: int) => boolean
	arspinner_enable: (this: void) => void
	arspinner_disable: (this: void) => void
	is_bigmap_active: (this: void) => boolean
	copy_to_clipboard: (this: void, text: string, notify: boolean) => void
	get_clipboard_text: (this: void) => string
	/** Allows you to read a file in the colons and tabs format, which is what Stand uses for profiles, hotkeys, etc. **/
	read_colons_and_tabs_file: (this: void, file: string) => LuaTable<string, string>
	/** Allows you to write a file in the colons and tabs format. **/
	write_colons_file: (this: void, file: string, data: LuaTable<string, string>) => void
	draw_ar_beacon: (this: void, pos: Vector3) => void
	/** Draws a box with 3d rotation using polys. Note that backfaceculling applies to the inside. **/
	draw_box: (this: void, pos: Vector3, rot: Vector3, dimensions: Vector3, r: int, g: int, b: int, a: int) => void
	request_script_host: (this: void, script: string | int) => boolean
	/** Registers the given file in the game so it can be used with natives, e.g. util.register_file(filesystem.resources_dir() .. "myscript.ytd") will allow you to use "myscript" as a texture dict for GRAPHICS natives. **/
	register_file: (this: void, path: string) => boolean
	/** Same as HUD._GET_LABEL_TEXT except it will bypass any replacements Stand might be making. **/
	get_label_text: (this: void, label_name: string) => string
	/** Registers a label, such that it can be used with HUD._GET_LABEL_TEXT and other natives. **/
	register_label: (this: void, text: string) => string
	/** vk int values can be found at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes **/
	is_key_down: (this: void, vk: int | string) => boolean
	call_foreign_function: (...arguments: any) => int
	get_rtti_name: (this: void, inst_addr: int) => string
	get_rtti_hierarchy: (this: void, inst_addr: int) => string
	set_particle_fx_asset: (this: void, hash: int | string) => void
	blip_handle_to_pointer: (this: void, blip_handle: int) => int
	get_blip_display: (this: void, blip_handle: int) => int
	teleport_2d: (this: void, x: number, y: number) => int
	is_interaction_menu_open: (this: void) => boolean
	on_transition_finished: (this: void, callback: Function) => int
}

/** @noSelf **/
declare let v3: {
	new: NewV3
	/** Creates a new v3 instance, which can be used anywhere a Vector3 or Vector3* is accepted. **/
	get: (this: void, addr: any | int) => LuaMultiReturn<[float,  float,  float]>
	getX: (this: void, addr: any | int) => float
	getY: (this: void, addr: any | int) => float
	getZ: (this: void, addr: any | int) => float
	getHeading: (this: void, addr: any | int) => float
	set: (this: void, addr: any | int, x: float, y: float, z: float) => void
	setX: (this: void, addr: any | int, x: float) => void
	setY: (this: void, addr: any | int, y: float) => void
	setZ: (this: void, addr: any | int, z: float) => void
	reset: (this: void, addr: any | int) => void
	/** Adds b to a. **/
	add: (this: void, a: any | int, b: any | int) => void
	/** Subtracts b from a. **/
	sub: (this: void, a: any | int, b: any | int) => void
	/** Multiplies a by f. **/
	mul: (this: void, a: any | int, f: number) => void
	/** Divides a by f. **/
	div: (this: void, a: any | int, f: number) => void
	eq: (this: void, a: any | int, b: any | int) => boolean
	/** Alternatively, you can use the # syntax on a v3 instance to get its magnitude. **/
	magnitude: (this: void, a: any | int) => number
	distance: (this: void, a: any | int, b: int) => number
	/** Ensures that every axis is positive. **/
	abs: (this: void, addr: any | int) => void
	sum: (this: void, addr: any | int) => void
	/** Returns the value of the smallest axis. **/
	min: (this: void, addr: any | int) => float
	/** Returns the value of the biggest axis. **/
	max: (this: void, addr: any | int) => float
	dot: (this: void, a: any | int, b: int) => number
	normalise: (this: void, addr: any | int) => void
	/** The result is a new instance. **/
	crossProduct: (this: void, a: any | int, b: int) => any
	/** The result is a new instance with rotation data. **/
	toRot: (this: void, addr: any | int) => any
	/** The result is a new instance with rotation data. **/
	lookAt: (this: void, a: any | int, b: int) => any
	/** The result is a new instance with direction data. The direction vector will have a magnitude of 1 / it is a unit vector, so you can safely multiply it. **/
	toDir: (this: void, addr: any | int) => any
	toString: (this: void, addr: any | int) => string
}

/** @noSelf **/
declare let lang: {
	/** Returns the current menu language, which could be a 2-letter language code, "en-us", "sex", "uwu", or "hornyuwu". **/
	get_current: (this: void) => string
	/** Text is assumed to be in English (UK). **/
	register: (this: void, text: string) => int
	/** Starts the process of translating labels. lang_code must be a 2-letter language code or "sex". **/
	set_translate: (this: void, lang_code: string) => void
	translate: (this: void, label: int, text: string) => void
	/** Finds an existing label using its text. Returns 0 if not found. lang_code must be a 2-letter language code or "sex". **/
	find: (this: void, text: string, lang_code: string) => int
	/** lang_code must be a 2-letter language code, "en-us", "sex", "uwu", or "hornyuwu". **/
	get_string: (this: void, label: Label, lang_code: string) => string
	get_code_for_soup: (this: void, lang_code: string) => string
}

/** @noSelf **/
declare let filesystem: {
	/** Possible return value: C:\Users\John\AppData\Roaming\ **/
	appdata_dir: (this: void) => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\ **/
	stand_dir: (this: void) => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\Lua Scripts\ **/
	scripts_dir: (this: void) => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\Lua Scripts\resources\ **/
	resources_dir: (this: void) => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\Lua Scripts\store\ **/
	store_dir: (this: void) => string
	exists: (this: void, path: string) => boolean
	is_regular_file: (this: void, path: string) => boolean
	is_dir: (this: void, path: string) => boolean
	mkdir: (this: void, path: string) => void
	mkdirs: (this: void, path: string) => void
	/** Returns an index-based table with all files in the given directory. **/
	list_files: (this: void, path: string) => string[]
}

/** @noSelf **/
declare let async_http: {
	/** This will make a GET request unless you use async_http.set_post before calling async_http.dispatch. **/
	init: (this: void, host: string, path: string, success_func?: Function, fail_func?: Function) => void
	/** Finish building the async http request and carry it out in separate OS thread. **/
	dispatch: (this: void) => void
	/** Changes the request method, adds Content-Type and Content-Length headers, and sets the payload. **/
	set_post: (this: void, content_type: string, payload: string) => void
	add_header: (this: void, key: string, value: string) => void
}

/** @noSelf **/
declare let memory: {
	/** Returns the address of the given script global. **/
	script_global: (this: void, global: int) => int
	/** Returns the address of the given script local or 0 if the script was not found. **/
	script_local: (this: void, script: string | int, local: int) => int
	/** The default size is 24 so it can fit a Vector3. **/
	alloc: (this: void, size: int) => any
	/** Allocates 4 bytes. **/
	alloc_int: (this: void) => any
	/** Scans the game's memory for the given IDA-style pattern. This is an expensive call so ideally you'd only ever scan for a pattern once and then use the resulting address until your script finishes. **/
	scan: (this: void, pattern: string) => int
	/** Follows an offset from the instruction pointer ("RIP") at the given address. **/
	rip: (this: void, addr: int) => int
	addrof: (this: void, ud: any) => any
	/** Reads an 8-bit integer at the given address. **/
	read_byte: (this: void, addr: int | any) => int
	/** Reads an unsigned 8-bit integer at the given address. **/
	read_ubyte: (this: void, addr: int | any) => int
	/** Reads a 16-bit integer at the given address. **/
	read_short: (this: void, addr: int | any) => int
	/** Reads an unsigned 16-bit integer at the given address. **/
	read_ushort: (this: void, addr: int | any) => int
	/** Reads a 32-bit integer at the given address. **/
	read_int: (this: void, addr: int | any) => int
	/** Reads an unsigned 32-bit integer at the given address. **/
	read_uint: (this: void, addr: int | any) => int
	/** Reads a 64-bit integer at the given address. **/
	read_long: (this: void, addr: int | any) => int
	read_float: (this: void, addr: int | any) => number
	read_string: (this: void, addr: int | any) => string
	/** Writes an 8-bit integer to the given address. **/
	write_byte: (this: void, addr: int | any, value: int) => void
	/** Writes an unsigned 8-bit integer to the given address. **/
	write_ubyte: (this: void, addr: int | any, value: int) => void
	/** Writes a 16-bit integer to the given address. **/
	write_short: (this: void, addr: int | any, value: int) => void
	/** Writes an unsigned 16-bit integer to the given address. **/
	write_ushort: (this: void, addr: int | any, value: int) => void
	/** Writes a 32-bit integer to the given address. **/
	write_int: (this: void, addr: int | any, value: int) => void
	/** Writes an unsigned 32-bit integer to the given address. **/
	write_uint: (this: void, addr: int | any, value: int) => void
	/** Writes a 64-bit integer to the given address. **/
	write_long: (this: void, addr: int | any, value: int) => void
	write_float: (this: void, addr: int | any, value: number) => void
	write_string: (this: void, addr: int | any, value: string) => void
	write_vector3: (this: void, addr: int | any, value: Vector3) => void
}

/** @noSelf **/
declare let profiling: {
	/** Executes the given function and prints the time it took to your log. **/
	once: (this: void, name: string, func: Function) => void
	/** Executes the given function and shows the time it took via the info text/debug text. **/
	tick: (this: void, name: string, func: Function) => void
}

