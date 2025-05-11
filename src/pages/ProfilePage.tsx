
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Mail, Phone, LogOut, Edit, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!user || !user.isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/');
  };

  const handleSaveProfile = () => {
    updateUser({ name, email, phone });
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès",
    });
  };

  return (
    <div className="container mx-auto pb-20 px-4 pt-10">
      <div className="max-w-md mx-auto border rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mon profil</h1>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} className="mr-1" /> Modifier
            </Button>
          ) : (
            <Button 
              className="bg-algeria-blue hover:bg-algeria-blue/90"
              size="sm"
              onClick={handleSaveProfile}
            >
              <Check size={16} className="mr-1" /> Sauvegarder
            </Button>
          )}
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <UserRound size={40} className="text-gray-400" />
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            {isEditing ? (
              <Input 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            ) : (
              <div className="flex items-center">
                <UserRound size={16} className="mr-2 text-gray-500" />
                <p>{user.name}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            ) : (
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-500" />
                <p>{user.email}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            {isEditing ? (
              <Input 
                id="phone"
                type="tel"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            ) : (
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-500" />
                <p>{user.phone || 'Non spécifié'}</p>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Mes réservations</h2>
          {user.bookings && user.bookings.length > 0 ? (
            <div className="space-y-2">
              {user.bookings.map(booking => (
                <div 
                  key={booking.id} 
                  className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/booking/${booking.id}`)}
                >
                  <div className="flex justify-between">
                    <p className="font-medium">Réservation #{booking.id.slice(0, 6)}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                  <p className="text-sm">{booking.items.length} articles · {booking.totalPrice.toFixed(2)} DZD</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Vous n'avez pas encore de réservations
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/explore')}
          >
            Explorer les destinations
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-6 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" /> Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
