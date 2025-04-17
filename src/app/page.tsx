"use client";

import React from 'react';
import { Pet, Vaccine, VetVisit } from '../types/pet';
import { Card, Typography, List, ListItem, ListItemText, Box, Drawer, ListItemButton, Grid } from '@mui/material';

// Sample pets data
const samplePets: Pet[] = [
  {
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    birthDate: new Date("2020-01-15"),
    weight: 30.5,
    lastWeighIn: new Date("2023-12-01"),
    vaccines: [
      {
        name: "Rabies",
        dateAdministered: new Date("2023-06-15"),
        nextDueDate: new Date("2024-06-15"),
      }
    ],
    vetVisits: [
      {
        date: new Date("2023-12-01"),
        reason: "Annual Checkup",
        notes: "All healthy, weight normal",
      }
    ],
  },
  {
    name: "Whiskers",
    species: "Cat",
    breed: "Siamese",
    birthDate: new Date("2021-03-10"),
    weight: 4.2,
    lastWeighIn: new Date("2023-11-15"),
    vaccines: [
      {
        name: "FVRCP",
        dateAdministered: new Date("2023-05-10"),
        nextDueDate: new Date("2024-05-10"),
      }
    ],
    vetVisits: [
      {
        date: new Date("2023-11-15"),
        reason: "Regular Checkup",
        notes: "Healthy, slight tartar buildup",
      }
    ],
  },
];

export default function Home() {
  const formatDate = (date: Date) => date.toLocaleDateString();
  const [selectedPet, setSelectedPet] = React.useState(samplePets[0]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 'var(--sidebar-width)',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 'var(--sidebar-width)',
            boxSizing: 'border-box',
            borderRight: '1px solid var(--divider-color)',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, mb: 2 }}>My Pets</Typography>
          <List>
            {samplePets.map((pet) => (
              <ListItemButton
                key={pet.name}
                selected={selectedPet.name === pet.name}
                onClick={() => setSelectedPet(pet)}
                sx={{ px: 2 }}
              >
                <ListItemText primary={pet.name} secondary={`${pet.species} - ${pet.breed}`} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h3" gutterBottom>{selectedPet.name}'s Dashboard</Typography>

        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            <Card className="p-4" sx={{padding: 1}}>
              <Typography variant="h5">Basic Information</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Species" secondary={selectedPet.species} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Breed" secondary={selectedPet.breed} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Birth Date" secondary={formatDate(selectedPet.birthDate)} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Weight"
                    secondary={`${selectedPet.weight} kg (as of ${formatDate(selectedPet.lastWeighIn)})`}
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Card className="p-4" sx={{padding: 1}}>
              <Typography variant="h5">Vaccines</Typography>
              <List>
                {selectedPet.vaccines.map((vaccine, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={vaccine.name}
                      secondary={`Given: ${formatDate(vaccine.dateAdministered)} | Next due: ${formatDate(vaccine.nextDueDate)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          <Grid size={{xs: 12}}>
            <Card className="p-4" sx={{padding: 1}}>
              <Typography variant="h5">Recent Vet Visits</Typography>
              <List>
                {selectedPet.vetVisits.map((visit, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${formatDate(visit.date)} - ${visit.reason}`}
                      secondary={visit.notes}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}