import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import { CustomButton } from "@/components/ui/CustomButton";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route copied to clipboard");
  };

  return (
    <Alert className="dark:bg-slate-800 dark:text-slate-300">
      <Server className="h-4 w-4 dark:text-slate-300" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]} </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] dark:text-slate-800 dark:bg-slate-400 font-mono  text-sm font-semibold">
          {description}
        </code>
        <CustomButton
          variant="outline"
          size="icon"
          onClick={onCopy}
          className="dark:bg-slate-400"
        >
          <Copy className="h-4 w-4 dark:text-slate-100" />
        </CustomButton>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
