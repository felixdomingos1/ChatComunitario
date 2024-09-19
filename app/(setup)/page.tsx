import { InitialModal } from "@/components/modals/initial-modal"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation"

const SetupPage = async () => {
  const profile = await initialProfile()

  if (!profile || !('id' in profile)) {
    return (
      <div>
        Perfil Não Encontrado
      </div>
    )
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id 
        }
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <InitialModal/>
  )
}

export default SetupPage
