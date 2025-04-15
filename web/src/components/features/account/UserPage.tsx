import DefaultLayout from "@/layouts/DefaultLayout"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAccountContext } from "./AccountContext";
import UserEditForm from "./UserEditForm";

export const UserPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { selectedUser } = useAccountContext();
  useEffect(() => {
    if (username) {
      if (selectedUser) {
        navigate(`/user/${selectedUser}`)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser])
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold my-4'>{username ? `編輯使用者：${username}` : "新增使用者"}</h1>
      {username ? (
        <></>
      ) : (
        <UserEditForm />
      )}
    </DefaultLayout>
  )
}
