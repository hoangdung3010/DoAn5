import { Inject, Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Hệ thống', icon: 'dashboard', role: '' },
    { state: 'department', name: 'Quản lý phòng ban', icon: 'category', role: 'admin' }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}