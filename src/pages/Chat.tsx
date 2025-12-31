import { useParams } from "react-router"


export default function Chat() {
  const { chatId } = useParams()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Chat</h1>
      <p className="opacity-80">Chat ID: {chatId}</p>
      <a
        href={`cubeapp://chat/${chatId}`}
        className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Open in App
      </a>
    </div>
  )
}
