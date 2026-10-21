import { Injectable } from '@nestjs/common';
import { Admin } from 'typeorm/driver/mongodb/typings.js';

//interfaz para tipar de forma segura la estructura de los usuarios
export interface UserInMemory {
    username: string;
    rol: 'admin' | 'gerente' | 'asesor';
}

@Injectable()
export class UsersService {
    // base de datos en memoria para el control de acceso
    private readonly users: UserInMemory[] = [
        { username: 'sofia.admin', rol: 'admin' },
        { username: 'andres.gerente', rol: 'gerente'},
        { username: 'valeria.asesor', rol: 'asesor'},
        { username: 'mateo.asesor', rol: 'asesor'}, // dos asesores para validar las restricciones cruzadas 
    ];

    // buscamos si el usuario existe en las cabezas del HTTPS de las peticiones
    findOne(username: string): UserInMemory | undefined {
        return this.users.find(user => user.username === username);
    }
}
