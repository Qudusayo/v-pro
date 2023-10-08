import Parse from "parse";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface WithAuthProps {
  isAuthenticated?: boolean;
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P & WithAuthProps> => {
  const Wrapper: React.FC<P & WithAuthProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const { push } = useRouter();

    useEffect(() => {
      let user = Parse.User.current();
      if (!user) {
        push("/auth/login");
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return (
        <div className="flex h-[100dvh] w-screen items-center justify-center">
          <Loader2 className="w-1h-12 mr-2 h-12 animate-spin text-primary" />
        </div>
      );
    }

    return <WrappedComponent {...props} isAuthenticated={true} />;
  };

  return Wrapper;
};

export default withAuth;
