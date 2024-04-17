import { genSalt, compare, hash } from "bcrypt";
export class Helper {
  static async HashString(inputString: string): Promise<string> {
    const salt = await genSalt()

    const hashedString = hash(inputString, salt)
    return hashedString
  }

  static async CompareHashedStrings(inputString: string, hashedString: string): Promise<boolean> {
    return await compare(inputString, hashedString)
  }

}
