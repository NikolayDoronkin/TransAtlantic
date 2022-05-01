import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Customer} from "./customer";

@Entity('customer_status')
export class CustomerStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : "s_name"})
    name: string;

    @Column({name : "description"})
    description: string;

    @OneToMany(() => Customer, customer => customer.status )
    customers: Customer[]

}
