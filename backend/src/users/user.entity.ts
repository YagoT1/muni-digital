import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  OPERADOR = 'operador',
  CIUDADANO = 'ciudadano',
  EMPLEADO = 'empleado',
  MODERADOR = 'moderador',
}

export enum Gender {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  NO_BINARIO = 'no_binario',
  PREFIERO_NO_DECIR = 'prefiero_no_decir',
}

export enum DocumentType {
  DNI = 'DNI',
  PASAPORTE = 'PASAPORTE',
  OTRO = 'OTRO',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  // Identidad básica
  @Column({ type: 'varchar', length: 100, nullable: true })
  firstName: string | null

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string | null

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 8, unique: true, nullable: true })
  dni: string | null

  @Column({ type: 'date' })
  birthDate: Date

  // Contacto
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  // ✅ Forzamos el tipo para evitar que TS/reflect lo tome como Object
  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string | null

  // Domicilio
  @Column({ type: 'varchar', length: 80 })
  country: string

  @Column({ type: 'varchar', length: 80 })
  province: string

  @Column({ type: 'varchar', length: 80 })
  city: string

  @Column({ type: 'varchar', length: 120, nullable: true })
  addressLine1: string | null

  @Column({ type: 'varchar', length: 120, nullable: true })
  addressLine2: string | null

  @Column({ type: 'varchar', length: 20, nullable: true })
  postalCode: string | null

  // Identificación fiscal (opcional)

  @Column({ type: 'varchar', length: 11, nullable: true, unique: true })
  cuil: string | null

  @Column({ type: 'enum', enum: DocumentType, nullable: true })
  documentType: DocumentType | null

  @Column({ type: 'varchar', length: 40, nullable: true })
  documentNumber: string | null

  // Demografía (opcional)
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender | null

  // Seguridad
  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CIUDADANO })
  role: UserRole

  // Solo empleado
  @Column({ type: 'varchar', length: 50, nullable: true })
  legajo: string | null

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'boolean', default: false })
  isVerified: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}