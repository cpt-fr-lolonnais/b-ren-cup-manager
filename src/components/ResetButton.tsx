import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useTournamentStore } from '@/lib/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function ResetButton() {
  const resetState = useTournamentStore(s => s.resetState);
  const setScreen = useTournamentStore(s => s.setScreen);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReset = () => {
    resetState();
    setScreen(1);
    setDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-4 left-4 z-40 text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1.5 bg-card/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Zurücksetzen
      </button>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Turnier zurücksetzen?</AlertDialogTitle>
            <AlertDialogDescription>
              Alle Eingaben gehen verloren. Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Zurücksetzen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
