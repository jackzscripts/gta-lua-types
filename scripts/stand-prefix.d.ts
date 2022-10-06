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
    list: (name: string, commandNames: string[], helpText: string, onLoad?: Function, onUnload?: Function) => CommandRef,
    action: (name: string, commandNames: string[], helpText: string, onClick?: Function, onCommand?: Function, syntax?: string, permission?: CommandPermission) => CommandRef,
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