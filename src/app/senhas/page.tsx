"use client";

import { useState, useEffect, useRef } from "react";
import {
  Eye,
  EyeOff,
  Key,
  LogOut,
  User,
  ExternalLink,
  Lock,
  Pencil,
  Trash2,
  Shield,
  Search,
  Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const popularServices = [
  { name: "Google", url: "https://www.google.com" },
  { name: "Facebook", url: "https://www.facebook.com" },
  { name: "Twitter", url: "https://twitter.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com" },
  { name: "GitHub", url: "https://github.com" },
];

export default function BoaSenhaMainScreen() {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [newPassword, setNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(12);
  const [serviceName, setServiceName] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState<{
    id: number;
    service: string;
    password: string;
    url: string;
  } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredServices, setFilteredServices] = useState(popularServices);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [savedPasswords, setSavedPasswords] = useState([
    {
      id: 1,
      service: "Google",
      password: "senhaForte1",
      url: "https://www.google.com",
    },
    {
      id: 2,
      service: "Facebook",
      password: "senhaForte2",
      url: "https://www.facebook.com",
    },
    {
      id: 3,
      service: "Twitter",
      password: "senhaForte3",
      url: "https://twitter.com",
    },
    {
      id: 4,
      service: "LinkedIn",
      password: "senhaForte4",
      url: "https://www.linkedin.com",
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = popularServices.filter((service) =>
      service.name.toLowerCase().includes(serviceName.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [serviceName]);

  const togglePasswordVisibility = (id: number) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const generatePassword = (length = passwordLength) => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (useUppercase) chars += uppercaseChars;
    if (useLowercase) chars += lowercaseChars;
    if (useNumbers) chars += numberChars;
    if (useSymbols) chars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    checkPasswordStrength(password);
    return password;
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const savePassword = () => {
    if (serviceName && serviceUrl && newPassword) {
      const newSavedPassword = {
        id: savedPasswords.length + 1,
        service: serviceName,
        password: newPassword,
        url: serviceUrl,
      };
      setSavedPasswords([...savedPasswords, newSavedPassword]);
      setServiceName("");
      setServiceUrl("");
      setNewPassword("");
    }
  };

  const openEditModal = (password: {
    id: number;
    service: string;
    password: string;
    url: string;
  }) => {
    setEditingPassword(password);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingPassword(null);
  };

  const updatePassword = () => {
    if (editingPassword) {
      setSavedPasswords(
        savedPasswords.map((p) =>
          p.id === editingPassword.id ? editingPassword : p
        )
      );
      closeEditModal();
    }
  };

  const deletePassword = (id: number) => {
    setSavedPasswords(savedPasswords.filter((p) => p.id !== id));
  };

  const handleServiceSelect = (service: { name: string; url: string }) => {
    setServiceName(service.name);
    setServiceUrl(service.url);
    setShowSuggestions(false);
  };

  const signOut = () => {
    router.push("/");
  };

  const passwordCards = [
    ...savedPasswords,
    ...Array(Math.max(0, 6 - savedPasswords.length)).fill(null),
  ].map((item, index) => (
    <Card
      key={item ? item.id : `placeholder-${index}`}
      className="p-4 bg-gradient-to-r from-purple-50 to-white hover:shadow-lg transition-shadow duration-300"
    >
      <CardContent className="p-0">
        {item ? (
          <div className="flex flex-col space-y-2 min-h-[124px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${item.url}/favicon.ico`}
                    alt={item.service}
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "/PlaceholderImage.png";
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg text-purple-700">
                  {item.service}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
               {/*  <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openEditModal(item)}
                  className="text-purple-600 hover:bg-purple-100"
                >
                  <Pencil className="h-4 w-4" />
                </Button> */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deletePassword(item.id)}
                  className="text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline text-sm flex items-center"
            >
              {item.url}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            <div className="flex items-center space-x-2">
              <Input
                type={showPassword[item.id] ? "text" : "password"}
                value={item.password}
                className="bg-white border-purple-200"
                readOnly
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => togglePasswordVisibility(item.id)}
                className="text-purple-600 hover:bg-purple-100"
              >
                {showPassword[item.id] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[140px] text-purple-400">
            <Lock className="h-8 w-8 mb-2" />
            <p className="text-sm">Espaço para nova senha</p>
          </div>
        )}
      </CardContent>
    </Card>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500">
      <nav className="bg-gradient-to-br from-purple-50 via-purple-100 opacity-80 to-purple-200 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600 flex items-center">
                <Image
                  src="/BoaSenhaIcon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                BoaSenha
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">
                  João Silva
                </span>
                <span className="text-xs text-gray-600">joao@email.com</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </Button>
              <Button
                onClick={() => signOut()}
                variant="ghost"
                size="icon"
                className="hidden md:flex"
              >
                <LogOut className="h-5 w-5 text-purple-600" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-2 pb-6 sm:px-6 lg:px-8 mt-16">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-hidden">
              <h2 className="text-2xl font-semibold mb-4">Minhas Senhas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {passwordCards}
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-md p-6 pb-3">
              <h2 className="text-2xl font-semibold mb-3">Gerar Nova Senha</h2>
              <div className="space-y-3 relative">
                <div className="absolute inset-[-20px] z-[5] bg-white bg-opacity-60 backdrop-blur-[4px] flex flex-col items-center justify-center">
                  <div className="animate-spin">
                    <Cog className="h-10 w-10 text-purple-600" />
                  </div>
                  <p className="text-purple-600 mt-4">
                    Ainda estamos desenvolvendo
                  </p>
                </div>
                <div className="relative">
                  <Label htmlFor="serviceName">Nome do Serviço</Label>
                  <div className="relative">
                    <Input
                      ref={searchInputRef}
                      id="serviceName"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      className="mt-1 pr-10"
                      placeholder="Digite o nome do serviço"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {showSuggestions && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1"
                    >
                      <div className="p-2 text-sm font-semibold text-gray-500">
                        Serviços Populares
                      </div>
                      {filteredServices.map((service) => (
                        <div
                          key={service.name}
                          className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                          onClick={() => handleServiceSelect(service)}
                        >
                          {service.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="serviceUrl">URL do Serviço</Label>
                  <Input
                    id="serviceUrl"
                    value={serviceUrl}
                    onChange={(e) => setServiceUrl(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <div className="flex mt-1">
                    <Input
                      id="newPassword"
                      type="text"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        checkPasswordStrength(e.target.value);
                      }}
                      className="flex-grow"
                    />
                    <Button
                      onClick={() => setNewPassword(generatePassword())}
                      className="ml-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Key className="h-5 w-5 mr-2" />
                      Gerar
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Força da Senha</Label>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-full ${
                          i < passwordStrength
                            ? passwordStrength <= 2
                              ? "bg-red-500"
                              : passwordStrength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      passwordStrength <= 2
                        ? "text-red-500"
                        : passwordStrength <= 3
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {passwordStrength <= 2
                      ? "Fraca"
                      : passwordStrength <= 3
                      ? "Média"
                      : "Forte"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "uppercase",
                      label: "Maiúsculas",
                      state: useUppercase,
                      setState: setUseUppercase,
                    },
                    {
                      id: "lowercase",
                      label: "Minúsculas",
                      state: useLowercase,
                      setState: setUseLowercase,
                    },
                    {
                      id: "numbers",
                      label: "Números",
                      state: useNumbers,
                      setState: setUseNumbers,
                    },
                    {
                      id: "symbols",
                      label: "Símbolos",
                      state: useSymbols,
                      setState: setUseSymbols,
                    },
                  ].map(({ id, label, state, setState }) => (
                    <div
                      key={id}
                      className="flex items-center space-x-2 bg-purple-50 p-2 rounded-md"
                    >
                      <Switch
                        id={id}
                        checked={state}
                        onCheckedChange={setState}
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <Label htmlFor={id} className="text-sm font-medium">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="passwordLength">Comprimento da Senha</Label>
                  <Input
                    id="passwordLength"
                    type="range"
                    min="8"
                    max="32"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Comprimento: {passwordLength}
                  </p>
                </div>
                <Button
                  onClick={savePassword}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Salvar Nova Senha
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-100 p-4 rounded-md">
                  <p className="text-2xl font-bold text-purple-600">12</p>
                  <p className="text-sm text-gray-600">Senhas Salvas</p>
                </div>
                <div className="bg-green-100 p-4 rounded-md">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-gray-600">Senhas Fortes</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-md">
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-gray-600">Senhas Médias</p>
                </div>
                <div className="bg-red-100 p-4 rounded-md">
                  <p className="text-2xl font-bold text-red-600">1</p>
                  <p className="text-sm text-gray-600">Senhas Fracas</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Dicas de Segurança</h3>
              <ul className="space-y-3">
                {[
                  "Use senhas únicas para cada conta",
                  "Ative a autenticação de dois fatores quando possível",
                  "Evite usar informações pessoais em suas senhas",
                  "Atualize suas senhas regularmente",
                  "Não compartilhe suas senhas com ninguém",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                      <span className="text-purple-600 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Senha</DialogTitle>
          </DialogHeader>
          {editingPassword && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editServiceName">Nome do Serviço</Label>
                <Input
                  id="editServiceName"
                  value={editingPassword.service}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="editServiceUrl">URL do Serviço</Label>
                <Input
                  id="editServiceUrl"
                  value={editingPassword.url}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="editPassword">Senha</Label>
                <div className="flex mt-1">
                  <Input
                    id="editPassword"
                    type="text"
                    value={editingPassword.password}
                    onChange={(e) => {
                      setEditingPassword({
                        ...editingPassword,
                        password: e.target.value,
                      });
                      checkPasswordStrength(e.target.value);
                    }}
                    className="flex-grow"
                  />
                  <Button
                    onClick={() =>
                      setEditingPassword({
                        ...editingPassword,
                        password: generatePassword(),
                      })
                    }
                    className="ml-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <Key className="h-5 w-5 mr-2" />
                    Gerar
                  </Button>
                </div>
              </div>
              <div>
                <Label>Força da Senha</Label>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-full ${
                        i < passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-red-500"
                            : passwordStrength <= 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <p
                  className={`text-sm mt-1 ${
                    passwordStrength <= 2
                      ? "text-red-500"
                      : passwordStrength <= 3
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength <= 2
                    ? "Fraca"
                    : passwordStrength <= 3
                    ? "Média"
                    : "Forte"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: "uppercase",
                    label: "Maiúsculas",
                    state: useUppercase,
                    setState: setUseUppercase,
                  },
                  {
                    id: "lowercase",
                    label: "Minúsculas",
                    state: useLowercase,
                    setState: setUseLowercase,
                  },
                  {
                    id: "numbers",
                    label: "Números",
                    state: useNumbers,
                    setState: setUseNumbers,
                  },
                  {
                    id: "symbols",
                    label: "Símbolos",
                    state: useSymbols,
                    setState: setUseSymbols,
                  },
                ].map(({ id, label, state, setState }) => (
                  <div
                    key={id}
                    className="flex items-center space-x-2 bg-purple-50 p-2 rounded-md"
                  >
                    <Switch
                      id={id}
                      checked={state}
                      onCheckedChange={setState}
                      className="data-[state=checked]:bg-purple-600"
                    />
                    <Label htmlFor={id} className="text-sm font-medium">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="editPasswordLength">Comprimento da Senha</Label>
                <Input
                  id="editPasswordLength"
                  type="range"
                  min="8"
                  max="32"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Comprimento: {passwordLength}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={closeEditModal}>
              Cancelar
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={updatePassword}
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
