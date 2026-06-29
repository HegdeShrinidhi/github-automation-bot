import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import RuleForm from "@/components/rules/rule-form";
import RuleList from "@/components/rules/rule-list";

export default async function RulesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Automation Rules
        </h1>

        <RuleForm />

        <RuleList />
      </main>
    </div>
  );
}