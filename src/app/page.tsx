'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Star, MapPin, User, Trophy, Users, History, LogOut } from 'lucide-react';

// Dados dos torneios
const tournaments = [
  {
    id: 1,
    name: "Torneio Regular Segunda",
    type: "regular",
    schedule: { dayOfWeek: "Segunda", time: "19:00" },
    location: "Clube de Bridge SP",
    playersRegistered: 12,
    maxPlayers: 24
  },
  {
    id: 2,
    name: "Campeonato Municipal",
    type: "special",
    date: "2024-03-23",
    time: "14:00",
    location: "Clube Paulista",
    playersRegistered: 8,
    maxPlayers: 32
  }
];

// Dados dos jogadores
const players = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    previousMatches: 3,
    rating: 4.8
  },
  {
    id: 2,
    name: "João Santos",
    location: "São Paulo, SP",
    previousMatches: 2,
    rating: 4.5
  }
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState('tournaments');
  const [selectedTournament, setSelectedTournament] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">BridgeMatch</h1>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            {[
              { id: 'tournaments', label: 'Torneios', icon: Trophy },
              { id: 'find-matches', label: 'Encontrar Parceiros', icon: Users },
              { id: 'history', label: 'Histórico', icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  currentTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentTab === 'tournaments' && (
          <Card>
            <CardHeader>
              <CardTitle>Torneios Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournaments.map(tournament => (
                  <div 
                    key={tournament.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{tournament.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {tournament.location}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {tournament.type === 'regular' 
                            ? `Toda ${tournament.schedule?.dayOfWeek} às ${tournament.schedule?.time}`
                            : `${tournament.date} às ${tournament.time}`
                          }
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {tournament.playersRegistered}/{tournament.maxPlayers} jogadores
                        </p>
                      </div>
                      <Button>Marcar Disponibilidade</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {currentTab === 'find-matches' && (
          <Card>
            <CardHeader>
              <CardTitle>Encontrar Parceiros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  value={selectedTournament}
                  onChange={setSelectedTournament}
                  options={tournaments.map(t => ({
                    value: t.id.toString(),
                    label: t.name
                  }))}
                />

                {players.map(player => (
                  <div 
                    key={player.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{player.name}</h3>
                          <p className="text-sm text-gray-500">
                            {player.location} • {player.previousMatches} partidas anteriores
                          </p>
                          <div className="mt-1">
                            <RatingStars rating={player.rating} />
                          </div>
                        </div>
                      </div>
                      <Button>Convidar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {currentTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {players.map(player => (
                  <div 
                    key={player.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{player.name}</h3>
                        <p className="text-sm text-gray-500">
                          {player.previousMatches} partidas jogadas
                        </p>
                      </div>
                      <RatingStars rating={player.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
