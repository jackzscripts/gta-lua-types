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

interface CommandRef {
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
	my_root: () => CommandRef
	/** Returns a reference to the list that the given player owns. **/
	player_root: (player_id: int) => CommandRef
	/** Using return value of this function to create a command produces a detached commmand (CommandUniqPtr) instead of a CommandRef. **/
	shadow_root: () => CommandRef
	/** Returns a reference to any command in Stand using a path such as Self>Immortality. Note that the path has to be in English (UK) and using the no-space greater-than separator. **/
	ref_by_path: (path: string, tree_version?: int) => CommandRef
	ref_by_rel_path: (base: int, path: string) => CommandRef
	ref_by_command_name: (command_name: string) => CommandRef
	list: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_click?: Function, on_back?: Function) => CommandRef | CommandUniqPtr
	/** perm may be any of: **/
	action: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_click: Function, on_command?: Function, syntax?: string, perm?: int) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with on and click_type. **/
	toggle: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_change: Function, default_on: boolean) => CommandRef | CommandUniqPtr
	/** Your on_tick function will be called every tick that the toggle is checked; you should not call util.yield in this context. **/
	toggle_loop: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_tick: Function, on_stop?: Function) => CommandRef | CommandUniqPtr
	slider: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_change: Function) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with value, prev_value and click_type. **/
	slider_float: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_change: Function) => CommandRef | CommandUniqPtr
	click_slider: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_click: Function) => CommandRef | CommandUniqPtr
	/** Your on_click function will be called with value and click_type. **/
	click_slider_float: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, min_value: int, max_value: int, default_value: int, step_size: int, on_click: Function) => CommandRef | CommandUniqPtr
	/** options must be table of list action item data or Label. List action item data is a table that contains at least a Label (menu_name), and can optionally have command_names and help_text. **/
	list_select: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: any[], default_value: int, on_change: Function) => CommandRef | CommandUniqPtr
	/** options must be table of list action item data or Label. List action item data is a table that contains at least a Label (menu_name), and can optionally have command_names and help_text. **/
	list_action: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: any[], on_item_click: Function) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with the string and click type. **/
	text_input: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, on_change: Function, default_value: string) => CommandRef | CommandUniqPtr
	/** Your on_change function will be called with a Colour as parameter. **/
	colour: ColourMenu
	/** Your on_change function will be called with a Colour as parameter. **/
	/** Creates a rainbow slider for the given colour command. This should be called right after creating the colour command. **/
	rainbow: (colour_command: CommandRef) => CommandRef | CommandUniqPtr
	divider: (parent: CommandRef, menu_name: Label) => CommandRef | CommandUniqPtr
	/** Pairs well with menu.on_tick_in_viewport and menu.set_value. **/
	readonly: (parent: CommandRef, menu_name: Label, value: string) => CommandRef | CommandUniqPtr
	hyperlink: (parent: CommandRef, menu_name: Label, link: string, help_text: Label) => CommandRef | CommandUniqPtr
	/** We highly recommend using menu.list_action instead of this, unless the options are really unimportant. **/
	action_slider: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: Label[], on_click: Function) => CommandRef | CommandUniqPtr
	/** We highly recommend using menu.list_select instead of this, unless the options are really unimportant. **/
	slider_text: (parent: CommandRef, menu_name: Label, command_names: string[], help_text: Label, options: Label[], on_click: Function) => CommandRef | CommandUniqPtr
	_delete: (command: CommandRef) => void
	replace: (old: CommandRef, newValue: CommandUniqPtr) => CommandRef
	detach: (command: CommandRef) => CommandUniqPtr
	attach: (parent: CommandRef, command: CommandUniqPtr) => CommandRef
	attach_after: (anchor: CommandRef, command: CommandUniqPtr) => CommandRef
	attach_before: (anchor: CommandRef, command: CommandUniqPtr) => CommandRef
	/** Returns if the referenced command still exists. **/
	is_ref_valid: (ref: CommandRef) => void
	focus: (command: CommandRef) => void
	get_applicable_players: (command: CommandRef, include_user?: boolean) => int[]
	/** Removes invalidated weakrefs from an internal vector. Stand does this automatically, but if you bulk-delete-or-replace commands, you might want to call this right after. **/
	collect_garbage: () => int
	is_open: () => boolean
	/** Returns the menu grid origin x & y. **/
	get_position: () => LuaMultiReturn<[number,  number]>
	/** Returns x, y, width, & height for the current main view (active list, warning, etc.). **/
	get_main_view_position_and_size: () => LuaMultiReturn<[number,  number,  number,  number]>
	get_active_list_cursor_text: (even_when_disabled: boolean, even_when_inappropriate: boolean) => string
	are_tabs_visible: () => boolean
	show_command_box: (prefill: string) => void
	show_command_box_click_based: (click_type: int, prefill: string) => void
	trigger_commands: (input: string) => void
	trigger_command: (command: CommandRef, arg: string) => void
	command_box_is_open: () => boolean
	/** Returns x, y, width, & height. **/
	command_box_get_dimensions: () => LuaMultiReturn<[number,  number,  number,  number]>
	is_in_screenshot_mode: () => boolean
	on_tick_in_viewport: (command: CommandRef, callback: Function) => int
	on_focus: (command: CommandRef, callback: Function) => int
	on_blur: (command: CommandRef, callback: Function) => int
	remove_handler: (command: CommandRef, handler_id: int) => void
	/** You might want to use lang.get_string on the return value. **/
	get_menu_name: (command: CommandRef | CommandUniqPtr) => Label
	get_command_names: (command: CommandRef | CommandUniqPtr) => string[]
	/** You might want to use lang.get_string on the return value. **/
	get_help_text: (command: CommandRef | CommandUniqPtr) => Label
	get_visible: (command: CommandRef) => boolean
	get_value: (command: CommandRef) => int | boolean | string
	get_min_value: (command: CommandRef) => int
	get_max_value: (command: CommandRef) => int
	get_step_size: (command: CommandRef) => int
	get_state: (command: CommandRef) => string
	get_default_state: (command: CommandRef) => string
	set_menu_name: (command: CommandRef | CommandUniqPtr, menu_name: Label) => void
	set_command_names: (command: CommandRef | CommandUniqPtr, command_names: string[]) => void
	set_help_text: (command: CommandRef | CommandUniqPtr, help_text: Label) => void
	set_visible: (command: CommandRef, visible: boolean) => void
	set_value: (command: CommandRef, value: int | boolean | string) => void
	set_min_value: (command: CommandRef, min_value: int) => void
	set_max_value: (command: CommandRef, max_value: int) => void
	set_step_size: (command: CommandRef, step_size: int) => void
	/** Also works for list_select. **/
	set_list_action_options: (command: CommandRef, options: any[]) => void
	/** Also works for slider_text. **/
	set_action_slider_options: (command: CommandRef, options: Label[]) => void
	/** skippable will not have an effect when "Force Me To Read Warnings" is disabled. **/
	show_warning: (command: CommandRef, click_type: int, message: string, proceed_callback: Function, cancel_callback?: Function, skippable?: boolean) => void
	/** Returns a 32-bit integer derived from the user's activation key. 0 if no activation key. **/
	get_activation_key_hash: () => int
	/** Returns a value between 0 and 3 depending on the user's edition. **/
	get_edition: () => int
}

/** @noSelf **/
declare let players: {
	/** Registers a function to be called when a player joins the session. Your callback will be called with the player id as argument. **/
	on_join: (callback: Function) => int
	/** Registers a function to be called when a player leaves the session. Your callback will be called with the player id and name as arguments. **/
	on_leave: (callback: Function) => int
	/** Calls your join handler(s) for every player that is already in the session. **/
	dispatch_on_join: () => void
	/** Checks if a player with the given id is in session. **/
	exists: (player_id: int) => boolean
	/** Alternative to the PLAYER.PLAYER_ID native. **/
	user: () => int
	/** Alternative to the PLAYER.PLAYER_PED_ID native. **/
	user_ped: () => int
	/** Returns an index-based table with all matching player ids. **/
	list: (include_user: boolean, include_friends: boolean, include_strangers: boolean) => int[]
	/** Like players.list but using Players > All Players > Excludes. **/
	list_all_with_excludes: (include_user: boolean) => int[]
	get_host: () => int
	get_script_host: () => int
	/** Returns an index-based table containing the ids of all players focused in the menu. **/
	get_focused: () => int[]
	get_name: (player_id: int) => string
	/** This value might be spoofed by hard RID spoofing. **/
	get_rockstar_id: (player_id: int) => int
	/** This value might be spoofed by soft RID spoofing. **/
	get_rockstar_id_2: (player_id: int) => int
	get_connect_ip: (player_id: int) => int
	get_connect_port: (player_id: int) => int
	get_online_ip: (player_id: int) => int
	get_online_port: (player_id: int) => int
	get_rank: (player_id: int) => int
	get_rp: (player_id: int) => int
	get_money: (player_id: int) => int
	get_wallet: (player_id: int) => int
	get_bank: (player_id: int) => int
	get_kd: (player_id: int) => number
	get_kills: (player_id: int) => int
	get_deaths: (player_id: int) => int
	/** Returns the same as the LOCALIZATION.GET_CURRENT_LANGUAGE native. **/
	get_language: (player_id: int) => int
	is_using_controller: (player_id: int) => boolean
	get_name_with_tags: (player_id: int) => string
	get_tags_string: (player_id: int) => string
	is_godmode: (player_id: int) => boolean
	/** Returns true if the player has the "Modder" tag. **/
	is_marked_as_modder: (player_id: int) => boolean
	/** Returns true if the player has the "Modder or Admin" tag. **/
	is_marked_as_modder_or_admin: (player_id: int) => boolean
	/** Returns true if the player has the "Admin" tag. **/
	is_marked_as_admin: (player_id: int) => boolean
	is_marked_as_attacker: (player_id: int) => boolean
	is_otr: (player_id: int) => boolean
	is_in_interior: (player_id: int) => boolean
	/** Returns the player's host token as a decimal string. **/
	get_host_token: (player_id: int) => string
	/** Returns the player's host token as a 16-character padded hex string. **/
	get_host_token_hex: (player_id: int) => string
	/** Returns -1 if not applicable. **/
	get_boss: (player_id: int) => int
	/** Returns -1 if not applicable. **/
	get_org_colour: (player_id: int) => int
	clan_get_motto: (player_id: int) => string
	/** Works correctly at all distances. **/
	get_position: (player_id: int) => any
	/** Works at all distances, but best when the user is close to them. **/
	get_vehicle_model: (player_id: int) => int
	send_sms: SendSMS
	get_cam_pos: (player_id: int) => Vector3
	get_cam_rot: (player_id: int) => Vector3
}

/** @noSelf **/
declare let entities: {
	/** A wrapper for the PED.CREATE_PED native. **/
	create_ped: (type: int, hash: int, pos: Vector3, heading: number) => int
	/** A wrapper for the VEHICLE.CREATE_VEHICLE native. **/
	create_vehicle: (hash: int, pos: Vector3, heading: number) => int
	/** A wrapper for the OBJECT.CREATE_OBJECT_NO_OFFSET native. **/
	create_object: (hash: int, pos: Vector3) => int
	/** Returns the user's current vehicle, last driven vehicle, or 0. **/
	get_user_vehicle_as_handle: () => int
	get_user_vehicle_as_pointer: () => int
	get_user_personal_vehicle_as_handle: () => int
	/** Returns the address of the entity with the given script handle. **/
	handle_to_pointer: (handle: int) => int
	/** Returns a script handle for the entity with the given address. This will force one to be allocated. Note that script handles are a limited resource. **/
	pointer_to_handle: (addr: int) => int
	/** This will force a script handle to be allocated for all vehicles. Note that script handles are a limited resource. **/
	get_all_vehicles_as_handles: () => int[]
	get_all_vehicles_as_pointers: () => int[]
	/** This will force a script handle to be allocated for all peds. Note that script handles are a limited resource. **/
	get_all_peds_as_handles: () => int[]
	get_all_peds_as_pointers: () => int[]
	/** This will force a script handle to be allocated for all objects. Note that script handles are a limited resource. **/
	get_all_objects_as_handles: () => int[]
	get_all_objects_as_pointers: () => int[]
	/** This will force a script handle to be allocated for all pickups. Note that script handles are a limited resource. **/
	get_all_pickups_as_handles: () => int[]
	get_all_pickups_as_pointers: () => int[]
	delete_by_handle: (handle: int) => void
	delete_by_pointer: (addr: int) => void
	get_model_hash: (addr: int) => int
	/** The result might be less precise than the native counterpart. **/
	get_position: (addr: int) => Vector3
	/** The result might be less precise than the native counterpart. **/
	get_rotation: (addr: int) => Vector3
	get_health: (addr: int) => number
	/** Only applicable to vehicles. **/
	get_current_gear: (addr: int) => int
	/** Only applicable to vehicles. **/
	set_current_gear: (addr: int, current_gear: int) => void
	/** Only applicable to vehicles. **/
	get_next_gear: (addr: int) => int
	/** Only applicable to vehicles. **/
	set_next_gear: (addr: int, next_gear: int) => void
	/** Only applicable to vehicles. **/
	get_rpm: (addr: int) => number
	/** Only applicable to vehicles. **/
	get_gravity: (addr: int) => number
	/** Only applicable to vehicles. **/
	set_gravity: (addr: int, gravity: number) => number
	/** Only applicable to vehicles. **/
	set_gravity_multiplier: (addr: int, gravity_multiplier: number) => number
	/** Only applicable to vehicles. Returns a value between 0.0 and 1.25. **/
	get_boost_charge: (addr: int) => number
	/** Returns a pointer or 0. **/
	get_draw_handler: (addr: int) => int
	vehicle_draw_handler_get_pearlecent_colour: (addr: int) => int
	vehicle_draw_handler_get_wheel_colour: (addr: int) => int
	get_vehicle_has_been_owned_by_player: (addr: int) => boolean
	/** Only applicable to peds. Returns a pointer or 0. **/
	get_player_info: (addr: int) => int
	player_info_get_game_state: (addr: int) => int
}

/** @noSelf **/
declare let chat: {
	/** Registers a function to be called when a chat message is sent: **/
	on_message: (callback: Function) => int
	/** As you might be aware, messages have a limit of 140 UTF-16 characters. However, that is only true for the normal input, as you can use up to 254 UTF-8 characters over the network, and many more for the local history. **/
	send_message: (text: string, team_chat: boolean, add_to_local_history: boolean, networked: boolean) => void
	/** sender will only be respected when recipient == players.user(), otherwise sender will be forced to players.user(). **/
	send_targeted_message: (recipient: int, sender: int, text: string, team_chat: boolean) => void
	/** Possible return values: **/
	get_state: () => int
	is_open: () => boolean
	open: () => void
	close: () => void
	/** Returns the message that the user is currently drafting or an empty string if not applicable. **/
	get_draft: () => string
	ensure_open_with_empty_draft: (team_chat: boolean) => void
	add_to_draft: (appendix: string) => void
	remove_from_draft: (characters: int) => void
}

/** @noSelf **/
declare let directx: {
	/** An absolute path is recommended, e.g. by using filesystem.resources_dir(). **/
	create_texture: (path: string) => int
	draw_texture: DrawTexture
	/** alignment can be any of: **/
	draw_text: (x: number, y: number, text: string, alignment: int, scale: number, colour: Colour, force_in_bounds: boolean) => void
	draw_rect: (x: number, y: number, width: number, height: number, colour: Colour) => void
	draw_line: DrawLine
	draw_triangle: (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, colour: Colour) => void
	get_client_size: () => LuaMultiReturn<[number,  number]>
	/** Returns width and height. **/
	get_text_size: (text: string, scale: number) => LuaMultiReturn<[number,  number]>
	pos_hud_to_client: (x: number, y: number) => LuaMultiReturn<[number,  number]>
	size_hud_to_client: (x: number, y: number) => LuaMultiReturn<[number,  number]>
	pos_client_to_hud: (x: number, y: number) => LuaMultiReturn<[number,  number]>
	size_client_to_hud: (x: number, y: number) => LuaMultiReturn<[number,  number]>
	blurrect_new: () => int
	/** Frees an instance. This is automatically done for all instances your script has allocated but not freed once it finishes. **/
	blurrect_free: (instance: int) => void
	/** Prefer to use 1 instance per region, as any draw with a different size requires the buffers to be reallocated. **/
	blurrect_draw: (instance: int, x: number, y: number, width: number, height: number, strength: int) => void
}

/** @noSelf **/
declare let util: {
	/** Loads the natives lib with the provided version, installing it from the repository if needed. **/
	require_natives: (version: int | string) => void
	/** Executes the given function in an OS thread to avoid holding up the game for expensive tasks like using require on a big file, creating lots of commands, or performing expensive calculations. Note that this will hold up your entire script, and calling natives or certain api functions in this context may lead to instabilities. **/
	execute_in_os_thread: (func: Function) => void
	/** Like require, but in an OS thread, to avoid holding up the game. Might not work for every library. **/
	require_no_lag: (file: string) => void
	/** Registers the parameter-function to be called every tick until it returns false. **/
	create_tick_handler: (func: Function) => void
	try_run: (func: Function) => void
	/** Prevents Stand's idle script cleanup. **/
	keep_running: () => void
	/** Pauses the execution of the calling thread until the next tick or in wake_in_ms milliseconds. **/
	yield: (wake_in_ms?: int) => void
	/** Creates the kind of thread that your script gets when it is created, or one of your callbacks is invoked, which is just another coroutine that gets resumed every tick and is expected to yield or return. **/
	create_thread: (...arguments: any) => void
	/** Stops the calling thread. **/
	stop_thread: () => void
	restart_script: () => void
	stop_script: () => void
	/** Called in the final tick of your script. Yielding or creating threads in that context is undefined behaviour. **/
	on_stop: (func: Function) => void
	/** Possible bitflags: **/
	toast: (message: string, bitflags: int) => void
	/** Alias for  **/
	log: (message: string) => void
	/** Draws the given text at the top left of the screen using the menu colour for the current frame. **/
	draw_debug_text: (text: string) => void
	/** Shorthand for **/
	show_corner_help: (message: string) => void
	/** Shorthand for **/
	replace_corner_help: (message: string, replacement_message: string) => void
	/** Replacement for **/
	set_local_player_wanted_level: (wanted_level: int, no_drop: boolean) => void
	/** JOAAT stands for Jenkins One At A Time which is the name of the hashing algorithm used pretty much everywhere in GTA. **/
	joaat: (text: string) => int
	/** Returns an empty string if the given hash is not found in Stand's dictionaries. **/
	reverse_joaat: (hash: int) => string
	is_this_model_a_blimp: (model: int | string) => boolean
	is_this_model_an_object: (model: int | string) => boolean
	is_this_model_a_submarine: (model: int | string) => boolean
	is_this_model_a_trailer: (model: int | string) => boolean
	/** Returns an index-based table with a table for each vehicle in the game. The inner tables contain name and manufacturer. **/
	get_vehicles: () => any[]
	/** Returns an index-based table with a table for each weapon in the game. The inner tables contain hash, label_key, category, & category_id. Note that the categories are specific to Stand. **/
	get_weapons: () => any[]
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_DISPLAY_TEXT: (message: string) => void
	/** Replacement for **/
	_BEGIN_TEXT_COMMAND_LINE_COUNT: (message: string) => void
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_IS_THIS_HELP_MESSAGE_BEING_DISPLAYED: (message: string) => void
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_DISPLAY_HELP: (message: string) => void
	/** Replacement for **/
	_BEGIN_TEXT_COMMAND_GET_WIDTH: (message: string) => void
	/** Replacement for **/
	BEGIN_TEXT_COMMAND_THEFEED_POST: (message: string) => void
	get_rp_required_for_rank: (rank: int) => int
	get_session_players_bitflag: () => int
	/** session_player_bitflags has a bit set to 1 for every player that should receive the script event; you can use util.get_session_players_bitflag() if you intend for everyone to receive the script event or use 1 << player_id to target individual players. **/
	trigger_script_event: (session_player_bitflags: int, data: LuaTable<any, int>) => void
	current_time_millis: () => int
	/** Returns how many seconds have passed since the UNIX epoch (00:00:00 UTC on 1 January 1970). **/
	current_unix_time_seconds: () => int
	remove_handler: (handler_id: int) => int
	is_session_started: () => boolean
	is_session_transition_active: () => boolean
	get_char_slot: () => int
	/** The most precise way to get the ground Z coordinate which respects water. **/
	get_ground_z: (x: number, y: number, z_hint: number) => LuaMultiReturn<[boolean,  number]>
	/** If the provided script is not running, your function is not called and this returns false. **/
	spoof_script: (script: string | int, func: Function) => boolean
	remove_blip: (blip: int) => boolean
	arspinner_enable: () => void
	arspinner_disable: () => void
	is_bigmap_active: () => boolean
	copy_to_clipboard: (text: string, notify: boolean) => void
	get_clipboard_text: () => string
	/** Allows you to read a file in the colons and tabs format, which is what Stand uses for profiles, hotkeys, etc. **/
	read_colons_and_tabs_file: (file: string) => LuaTable<string, string>
	/** Allows you to write a file in the colons and tabs format. **/
	write_colons_file: (file: string, data: LuaTable<string, string>) => void
	draw_ar_beacon: (pos: Vector3) => void
	/** Draws a box with 3d rotation using polys. Note that backfaceculling applies to the inside. **/
	draw_box: (pos: Vector3, rot: Vector3, dimensions: Vector3, r: int, g: int, b: int, a: int) => void
	request_script_host: (script: string | int) => boolean
	/** Registers the given file in the game so it can be used with natives, e.g. util.register_file(filesystem.resources_dir() .. "myscript.ytd") will allow you to use "myscript" as a texture dict for GRAPHICS natives. **/
	register_file: (path: string) => boolean
	/** Same as HUD._GET_LABEL_TEXT except it will bypass any replacements Stand might be making. **/
	get_label_text: (label_name: string) => string
	/** Registers a label, such that it can be used with HUD._GET_LABEL_TEXT and other natives. **/
	register_label: (text: string) => string
	/** vk int values can be found at https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes **/
	is_key_down: (vk: int | string) => boolean
	call_foreign_function: (...arguments: any) => int
	get_rtti_name: (inst_addr: int) => string
	get_rtti_hierarchy: (inst_addr: int) => string
	set_particle_fx_asset: (hash: int | string) => void
	blip_handle_to_pointer: (blip_handle: int) => int
	get_blip_display: (blip_handle: int) => int
	teleport_2d: (x: number, y: number) => int
	is_interaction_menu_open: () => boolean
	on_transition_finished: (callback: Function) => int
}

/** @noSelf **/
declare let v3: {
	new: NewV3
	/** Creates a new v3 instance, which can be used anywhere a Vector3 or Vector3* is accepted. **/
	get: (addr: any | int) => LuaMultiReturn<[float,  float,  float]>
	getX: (addr: any | int) => float
	getY: (addr: any | int) => float
	getZ: (addr: any | int) => float
	getHeading: (addr: any | int) => float
	set: (addr: any | int, x: float, y: float, z: float) => void
	setX: (addr: any | int, x: float) => void
	setY: (addr: any | int, y: float) => void
	setZ: (addr: any | int, z: float) => void
	reset: (addr: any | int) => void
	/** Adds b to a. **/
	add: (a: any | int, b: any | int) => void
	/** Subtracts b from a. **/
	sub: (a: any | int, b: any | int) => void
	/** Multiplies a by f. **/
	mul: (a: any | int, f: number) => void
	/** Divides a by f. **/
	div: (a: any | int, f: number) => void
	eq: (a: any | int, b: any | int) => boolean
	/** Alternatively, you can use the # syntax on a v3 instance to get its magnitude. **/
	magnitude: (a: any | int) => number
	distance: (a: any | int, b: int) => number
	/** Ensures that every axis is positive. **/
	abs: (addr: any | int) => void
	sum: (addr: any | int) => void
	/** Returns the value of the smallest axis. **/
	min: (addr: any | int) => float
	/** Returns the value of the biggest axis. **/
	max: (addr: any | int) => float
	dot: (a: any | int, b: int) => number
	normalise: (addr: any | int) => void
	/** The result is a new instance. **/
	crossProduct: (a: any | int, b: int) => any
	/** The result is a new instance with rotation data. **/
	toRot: (addr: any | int) => any
	/** The result is a new instance with rotation data. **/
	lookAt: (a: any | int, b: int) => any
	/** The result is a new instance with direction data. The direction vector will have a magnitude of 1 / it is a unit vector, so you can safely multiply it. **/
	toDir: (addr: any | int) => any
	toString: (addr: any | int) => string
}

/** @noSelf **/
declare let lang: {
	/** Returns the current menu language, which could be a 2-letter language code, "en-us", "sex", "uwu", or "hornyuwu". **/
	get_current: () => string
	/** Text is assumed to be in English (UK). **/
	register: (text: string) => int
	/** Starts the process of translating labels. lang_code must be a 2-letter language code or "sex". **/
	set_translate: (lang_code: string) => void
	translate: (label: int, text: string) => void
	/** Finds an existing label using its text. Returns 0 if not found. lang_code must be a 2-letter language code or "sex". **/
	find: (text: string, lang_code: string) => int
	/** lang_code must be a 2-letter language code, "en-us", "sex", "uwu", or "hornyuwu". **/
	get_string: (label: Label, lang_code: string) => string
	get_code_for_soup: (lang_code: string) => string
}

/** @noSelf **/
declare let filesystem: {
	/** Possible return value: C:\Users\John\AppData\Roaming\ **/
	appdata_dir: () => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\ **/
	stand_dir: () => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\Lua Scripts\ **/
	scripts_dir: () => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\Lua Scripts\resources\ **/
	resources_dir: () => string
	/** Possible return value: C:\Users\John\AppData\Roaming\Stand\Lua Scripts\store\ **/
	store_dir: () => string
	exists: (path: string) => boolean
	is_regular_file: (path: string) => boolean
	is_dir: (path: string) => boolean
	mkdir: (path: string) => void
	mkdirs: (path: string) => void
	/** Returns an index-based table with all files in the given directory. **/
	list_files: (path: string) => string[]
}

/** @noSelf **/
declare let async_http: {
	/** This will make a GET request unless you use async_http.set_post before calling async_http.dispatch. **/
	init: (host: string, path: string, success_func?: Function, fail_func?: Function) => void
	/** Finish building the async http request and carry it out in separate OS thread. **/
	dispatch: () => void
	/** Changes the request method, adds Content-Type and Content-Length headers, and sets the payload. **/
	set_post: (content_type: string, payload: string) => void
	add_header: (key: string, value: string) => void
}

/** @noSelf **/
declare let memory: {
	/** Returns the address of the given script global. **/
	script_global: (global: int) => int
	/** Returns the address of the given script local or 0 if the script was not found. **/
	script_local: (script: string | int, local: int) => int
	/** The default size is 24 so it can fit a Vector3. **/
	alloc: (size: int) => any
	/** Allocates 4 bytes. **/
	alloc_int: () => any
	/** Scans the game's memory for the given IDA-style pattern. This is an expensive call so ideally you'd only ever scan for a pattern once and then use the resulting address until your script finishes. **/
	scan: (pattern: string) => int
	/** Follows an offset from the instruction pointer ("RIP") at the given address. **/
	rip: (addr: int) => int
	addrof: (ud: any) => any
	/** Reads an 8-bit integer at the given address. **/
	read_byte: (addr: int | any) => int
	/** Reads an unsigned 8-bit integer at the given address. **/
	read_ubyte: (addr: int | any) => int
	/** Reads a 16-bit integer at the given address. **/
	read_short: (addr: int | any) => int
	/** Reads an unsigned 16-bit integer at the given address. **/
	read_ushort: (addr: int | any) => int
	/** Reads a 32-bit integer at the given address. **/
	read_int: (addr: int | any) => int
	/** Reads an unsigned 32-bit integer at the given address. **/
	read_uint: (addr: int | any) => int
	/** Reads a 64-bit integer at the given address. **/
	read_long: (addr: int | any) => int
	read_float: (addr: int | any) => number
	read_string: (addr: int | any) => string
	/** Writes an 8-bit integer to the given address. **/
	write_byte: (addr: int | any, value: int) => void
	/** Writes an unsigned 8-bit integer to the given address. **/
	write_ubyte: (addr: int | any, value: int) => void
	/** Writes a 16-bit integer to the given address. **/
	write_short: (addr: int | any, value: int) => void
	/** Writes an unsigned 16-bit integer to the given address. **/
	write_ushort: (addr: int | any, value: int) => void
	/** Writes a 32-bit integer to the given address. **/
	write_int: (addr: int | any, value: int) => void
	/** Writes an unsigned 32-bit integer to the given address. **/
	write_uint: (addr: int | any, value: int) => void
	/** Writes a 64-bit integer to the given address. **/
	write_long: (addr: int | any, value: int) => void
	write_float: (addr: int | any, value: number) => void
	write_string: (addr: int | any, value: string) => void
	write_vector3: (addr: int | any, value: Vector3) => void
}

/** @noSelf **/
declare let profiling: {
	/** Executes the given function and prints the time it took to your log. **/
	once: (name: string, func: Function) => void
	/** Executes the given function and shows the time it took via the info text/debug text. **/
	tick: (name: string, func: Function) => void
}

