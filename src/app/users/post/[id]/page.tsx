"use client";

import { fakePosts } from "@/constants/Post";
import { useParams } from "next/navigation";
import { Input, Image as AntImage, Divider, Badge, Space, Avatar, Drawer } from "antd";
import { fakeComments } from "@/constants/User";
import { Button } from "@/components/ui/button";
import { Share2, Clock, Users, DollarSign, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FoodPage() {
  const { id } = useParams();
  const singleFakePost = fakePosts.find(post => post.id === id);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 w-full min-h-screen lg:h-[calc(100vh-2rem)]">
      {/* Left Column - Food Details */}
      <div className="flex-1 border rounded-2xl bg-white p-4 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{singleFakePost?.title}</h1>
            <Badge count={`$${singleFakePost?.price || '0'}`} color="#22c55e" />
          </div>
          <Space>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Compartir</span>
            </Button>
            <Button className="flex items-center gap-2">
              Me interesa
            </Button>
          </Space>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <Users className="w-4 h-4" />
            <span>4 porciones</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <DollarSign className="w-4 h-4" />
            <span>${singleFakePost?.price || '0'}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-base">{singleFakePost?.description}</p>
        </div>

        <div className="flex-1 relative rounded-lg overflow-hidden">
          <AntImage
            src={singleFakePost?.images[0]}
            alt={singleFakePost?.title || 'Food image'}
            width="100%"
            height="100%"
            className="object-cover hover:scale-[1.02] transition-transform duration-200"
            fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdL3FeRfpb0YfZ168d3qcJg20m63e4AAXx8A&s"
          />
        </div>
      </div>

      {/* Right Column - Comments (Desktop) */}
      <div className="hidden lg:flex w-[400px] border rounded-2xl bg-white p-4 flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Comentarios</h3>
          <span className="text-sm text-gray-500">{fakeComments.length} comentarios</span>
        </div>

        <div className="flex-1 overflow-y-auto mb-4">
          <div className="flex flex-col gap-3">
            {fakeComments.map(comment => (
              <div 
                key={comment.id} 
                className="flex items-start gap-3 bg-white rounded-lg p-3 border hover:border-primary hover:shadow-sm transition-all duration-200"
              >
                <Avatar 
                  src={comment.userImage} 
                  size={36}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">{comment.username}</h4>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider type="horizontal" className="my-4" />

        <form className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 3 }}
              placeholder="Escribe un comentario..."
              className="border-gray-200 focus:border-primary flex-1"
            />
            <Button size="icon" className="h-[72px]">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Mobile Comments Button */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <Button 
            className="w-full flex items-center justify-center gap-2 py-5"
            onClick={() => setIsCommentsOpen(true)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Ver comentarios ({fakeComments.length})</span>
          </Button>
        </div>
      </div>

      {/* Mobile Comments Drawer */}
      <Drawer
        title="Comentarios"
        placement="right"
        onClose={() => setIsCommentsOpen(false)}
        open={isCommentsOpen}
        width="100%"
        className="lg:hidden"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">{fakeComments.length} comentarios</span>
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            <div className="flex flex-col gap-3">
              {fakeComments.map(comment => (
                <div 
                  key={comment.id} 
                  className="flex items-start gap-3 bg-white rounded-lg p-3 border hover:border-primary hover:shadow-sm transition-all duration-200"
                >
                  <Avatar 
                    src={comment.userImage} 
                    size={36}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">{comment.username}</h4>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider type="horizontal" className="my-4" />

          <form className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 3 }}
                placeholder="Escribe un comentario..."
                className="border-gray-200 focus:border-primary flex-1"
              />
              <Button size="icon" className="h-[72px]">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
}