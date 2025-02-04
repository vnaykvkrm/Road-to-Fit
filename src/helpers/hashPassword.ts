import * as bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default hashPassword
