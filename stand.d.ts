/** @noSelf **/
declare namespace util {
    function yield(ms?: number): void
    function joaat(name: string): Hash
}


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

declare interface CommandRef {
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

/** @noSelf **/
declare namespace menu {
    function list(menu: CommandRef, name: string, commandNames: string[], helpText: string, onLoad?: Function, onUnload?: Function): CommandRef
    function action(menu: CommandRef, name: string, commandNames: string[], helpText: string, onClick?: Function, onCommand?: Function, syntax?: string, permission?: CommandPermission): CommandRef
    function toggle(menu: CommandRef, name: string, commandNames: string[], helpText: string, onToggle: (value: boolean) => any): CommandRef
    function toggle_click(menu: CommandRef, name: string, commandNames: string[], helpText: string, onLoop: () => void, onStop?: Function): CommandRef
}

declare interface CommandUniqPtr {
    menu_name: string
    command_names: string[]
    help_text: string
}

/** @noSelf **/
declare namespace entities {
    function create_vehicle(hash: Hash, pos: Vector3, heading: number): EntityHandle
}