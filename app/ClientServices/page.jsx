import { ClientServices } from '../../components/Index'
import { userRole } from "../../api/firebase/functions/auth"

export default function page() {
  if (userRole() == null) return <p>Please log in</p>;
  return (
    <p><ClientServices /></p>
  )
}
