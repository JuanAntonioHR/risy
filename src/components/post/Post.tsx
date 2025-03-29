import { Button } from "../ui/button";
import { Input, Divider, Image as AntImage } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Post as IPost } from "@/interfaces/Post";
import { useMutation } from "@tanstack/react-query";
import { likePost } from "@/service/user/like";
import { useState } from "react";
import { postComment } from "@/service/comments/post";


export function Post({ title, description, images, comments, userId, goToProvider, id }: IPost) {
  const router = useRouter();
  const [form, setForm] = useState({
    comment: "",
  });
  const { mutate: postCommentFn } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setForm({ comment: "" });
      window.location.reload();
    }
  });
  const { mutate: likePostFn } = useMutation({
    mutationFn: (postId: string) => likePost(postId, userId),
    onSuccess: () => {
      if (goToProvider) router.push(`/users/providers/${userId}`);
    }
  });


  return (
    <div className="flex flex-col gap-4 p-8 w-full border rounded-2xl bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <Button
          onClick={() => {
            likePostFn(id as string);
            if (goToProvider) {
              router.push(`/users/providers/${userId}`)
            };
          }}
        >
          Me interesa
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <p>{description}</p>
        </div>

        <div className="flex-1 flex gap-2 flex-wrap">
          {
            images?.map(image => {
              return (
                <AntImage
                  key={image}
                  src={image}
                  alt=""
                  width={192}
                  height={192}
                  className="object-cover rounded-lg"
                  fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdL3FeRfpb0YfZ168d3qcJg20m63e4AAXx8A&s"
                />
              )
            })
          }
        </div>

        <form className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Comentarios</h3>
          <div className="flex flex-col gap-2">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border">
                <Image
                  src={comment.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdL3FeRfpb0YfZ168d3qcJg20m63e4AAXx8A&s"}
                  alt={comment.name || "user image"}
                  width={32}
                  height={32}
                  className="rounded-full !w-10 !h-10"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold">{comment.name || "Anónimo"}</h4>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider type="horizontal" />

          <p className="text-sm">Escribe un comentario</p>

          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 4 }}
            placeholder="Escribe un comentario"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />
          <Button
            className="w-fit self-end"
            onClick={() => {
              postCommentFn({
                postId: Number(id),
                content: form.comment,
                userId: userId,
              });
            }}
          >
            Comentar
          </Button>
        </form>

      </div>
    </div>
  );
}