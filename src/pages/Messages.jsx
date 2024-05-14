import Chat from "../components/chat/Chat";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
export default function Messages() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" flex justify-start w-full">
        <h1 className="text-black font-header text-4xl font-semibold px-6">
          Messages
        </h1>
      </div>
      <Chat />
    </div>
  );
}

