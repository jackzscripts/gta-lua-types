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

type SendSMS = (recipient: int, text: string) => void
    | ((recipient: int, sender: int, text: string) => void)

type DrawTexture = (id: int, sizeX: number, sizeY: number, centerX: number, centerY: number, posX: number, posY: number, rotation: number, colour: Colour) => void
    | ((id: int, sizeX: number, sizeY: number, centerX: number, centerY: number, posX: number, posY: number, rotation: number, r: number, g: number, b: number, a: number) => void)

type DrawLine = (x1: number, y1: number, x2: number, y2: number, colour: Colour) => void
| ((x1: number, y1: number, x2: number, y2: number, colour1: Colour, colour2: Colour) => void)