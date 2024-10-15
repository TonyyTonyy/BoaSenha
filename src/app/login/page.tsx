"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockIcon, UserIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* router.push('/senhas') */
    if (isLogin) {
      console.log("Login:", { username, password });
    } else {
      if (password !== confirmPassword) {
        alert("As senhas precisam ser iguais");
        return;
      }
      console.log("Register:", { username, email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-800">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <span className="absolute flex text-white items-center font-semibold text-lg -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image src="/BoaSenhaIcon.png" alt="Logo" width={40} height={40} />
            BoaSenha
          </span>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            {isLogin ? "Login" : "Registro"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {isLogin ? "Bem vindo de volta!" : "Escreva suas credenciais"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form onSubmit={handleSubmit} className="space-y-4" layout>
            <div className="space-y-2">
              <Label htmlFor="username">Nome</Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Escreva seu nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            {!isLogin && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <MailIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Coloque seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            {!isLogin && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <div className="relative">
                  <LockIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>
            )}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLogin ? "Login" : "Registrar-se"}
            </Button>
          </motion.form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 w-full">
            {isLogin ? "Não tem conta ainda?" : "Já tem conta?"}
            <Button
              variant="link"
              className="text-purple-600 hover:text-purple-700 px-1 ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Registre-se" : "Login"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
