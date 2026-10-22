import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateQuoteDto {
    @IsString()
    @IsNotEmpty({ message: 'el destino no puede estar vacio.' })
    @MinLength(3, { message: 'el destino debe tener al menos tres caracteres.' })
    destination: string;

    @IsString()
    @IsNotEmpty({ message: 'el nombre del hotel no puede estar vacio' })
    hotelName: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'el precio debe ser un numero valido' })
    @IsPositive({ message: 'el numero debe ser positivo mayor a cero'})
    price: number;

    @IsString()
    @IsNotEmpty({ message: 'el nombre del cliente no puede estar vacio'})
    clientName: string;

    //no agrege el createdBy por proteccion de seguridad para evitar suplantaciones de identidad
}