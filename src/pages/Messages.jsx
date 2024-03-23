import Chat from "../components/chat/Chat";
export default function Messages() {
  return (
    <>
      <div className="bg-grey-100 px-6 h-screen w-screen">
        <h2 className="p-2">messages</h2>
        <Chat />
      </div>
    </>
  );
}
