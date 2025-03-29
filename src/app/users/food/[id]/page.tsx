"use client";

import { useParams } from "next/navigation";
import { fakeFoods } from "@/constants/Food";
import { Input, Image as AntImage, Divider } from "antd";
import { fakeComments } from "@/constants/User";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function FoodPage() {
  const { id } = useParams();
  const singleFakeFood = fakeFoods.find(food => food.id === id);

  return (
    <div className="flex flex-col gap-4 p-8 w-full border rounded-2xl bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">{singleFakeFood?.title}</h1>
        <Button>Me interesa</Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <p>{singleFakeFood?.description}</p>
        </div>

        <div className="flex-1 flex gap-2 flex-wrap">
          {
            fakeFoods.map(fakeFood => {
              return (
                <AntImage
                  key={fakeFood.id}
                  src={fakeFood.image}
                  alt={fakeFood.title}
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
            {fakeComments.map(comment => (
              <div key={comment.id} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border">
                <Image
                  src={comment.userImage}
                  alt={comment.username}
                  width={32}
                  height={32}
                  className="rounded-full !w-10 !h-10"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold">{comment.username}</h4>
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
          />
          <Button
            className="w-fit self-end"
          >
            Comentar
          </Button>
        </form>

      </div>
    </div>
  );
}