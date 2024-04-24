import * as bcrypt from "bcrypt"

export default class Helper {
  static async hashPassword(input: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(input, salt)
  }

  static async verifyString(input: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(input, hashed)
  }
}
