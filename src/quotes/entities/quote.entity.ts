import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('quotes') //nombre de la tabla en PostgreSQL
export class Quote {
    @PrimaryGeneratedColumn('uuid') //ID autogenerado unico (UUID para mayor seguridad)
    id: string;

    @Column({ type: 'varchar', length: 150 })
    destination: string;

    @Column({ type: 'varchar', length: 150 })
    hotelName: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column({ type: 'varchar', length: 100 })
    clientName: string;

    @Column({ type: 'varchar', length: 100 })
    createdBy: string // aqui se guardara el username del asesor que la creo

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; //automatizacion de la fecha
}
