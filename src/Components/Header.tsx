import { Car } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Sistem Parkiran
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola parkiran Anda dengan mudah
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
