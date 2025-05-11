
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRound, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate login process
    setTimeout(() => {
      login(email, password);
      toast({
        title: "Connecté",
        description: "Connexion réussie",
      });
      navigate('/profile');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="container mx-auto pb-20 px-4 pt-10">
      <div className="max-w-md mx-auto border rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-algeria-blue hover:bg-algeria-blue/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p>
            Pas encore de compte?{' '}
            <Link to="/register" className="text-algeria-blue hover:underline">
              S'inscrire
            </Link>
          </p>
          <Button 
            variant="link" 
            className="text-gray-500 mt-2 text-sm p-0"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
