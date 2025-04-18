import { Button } from "ui";
import Link from "next/link";

interface NavbarProps {
  user?: {
    name: string;
    image?: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-linkedin-blue">LiG</div>
            <span className="hidden text-xl font-semibold md:inline-block">LinkedIn Generator</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">{user.name}</span>
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linkedin-blue text-white">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm">Log In</Button>
              <Button size="sm">Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 