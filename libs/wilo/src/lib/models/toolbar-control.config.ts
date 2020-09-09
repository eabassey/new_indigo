
export interface ToolbarControlConfig {
    id?: any;
    icon?: string;
    text?: string;
    instruction?: string;
    command?: Function;
    type?: 'standalone' | 'dropdown';
    children?: ToolbarControlConfig[];
}
