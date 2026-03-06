// src/seed/seed-admin.ts
import * as bcrypt from 'bcrypt'
import { DataSource } from 'typeorm'
import { User, UserRole } from '../users/user.entity'

export async function seedAdmin(dataSource: DataSource) {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const dni = process.env.ADMIN_DNI
  const firstName = process.env.ADMIN_FIRSTNAME ?? 'Admin'
  const lastName = process.env.ADMIN_LASTNAME ?? 'Sistema'
  const birthDate = process.env.ADMIN_BIRTHDATE ?? '1990-01-01'

  // ✅ NUEVO: ubicación mínima obligatoria para cumplir NOT NULL
  const country = (process.env.ADMIN_COUNTRY ?? 'AR').trim()
  const province = (process.env.ADMIN_PROVINCE ?? 'Buenos Aires').trim()
  const city = (process.env.ADMIN_CITY ?? 'Roque Pérez').trim()

  if (!email || !password || !dni) {
    console.log('[seedAdmin] ADMIN_EMAIL/ADMIN_PASSWORD/ADMIN_DNI no configurados. Skip.')
    return
  }

  const repo = dataSource.getRepository(User)

  const exists = await repo.findOne({ where: { email } })
  if (exists) {
    console.log('[seedAdmin] Admin ya existe. Skip.')
    return
  }

  const hashed = await bcrypt.hash(password, 10)

  const admin = repo.create({
    firstName,
    lastName,
    dni,
    birthDate: new Date(birthDate),
    email,
    password: hashed,
    role: UserRole.ADMIN,
    isActive: true,
    isVerified: true,

    // ✅ OBLIGATORIOS
    country,
    province,
    city,
  })

  await repo.save(admin)
  console.log('[seedAdmin] Admin creado:', email)
}