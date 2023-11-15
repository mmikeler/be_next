export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{ width: '360px' }}
      className="mx-auto bg-white border-l border-r border-gray-300 min-h-screen">
      {children}
    </div>
  )
}