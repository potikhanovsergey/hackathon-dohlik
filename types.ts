import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { Role, User } from "db"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
