import "@/styles/globals.css";

export const metadata = {
  title: "LinkedIn Content Generator",
  description: "Generate and manage LinkedIn content based on your writing style",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
} 