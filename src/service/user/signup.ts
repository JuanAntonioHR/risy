import { ApiResponse } from "@/interfaces/Api";
import { IUser } from "@/interfaces/User";

console.log(process.env.NEXT_PUBLIC_API_URL);

export async function signup(user: IUser) {
  const response: ApiResponse<IUser> = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => new Error(err.message));

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}
