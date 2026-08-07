# 🎯 Dart — licznik

Licznik punktów do darta. Otwierasz na telefonie, dodajesz do ekranu początkowego
i masz appkę — bez App Store, bez konta, bez reklam. Działa offline.

**→ [lubianiec.github.io/dart-licznik](https://lubianiec.github.io/dart-licznik/)**

## Gra 501

- **301 / 501 / 701**, od 1 do 4 graczy
- Wyjście **na double** (klasyczne) albo dowolne
- Legi — do 1, 2, 3 lub 5 wygranych
- Duże liczby „ile zostało", aktywny gracz podświetlony
- **Podpowiedź wyjścia** — gdy zejdziesz do 170 lub niżej, appka pokazuje jak
  skończyć, i przelicza ją po każdej lotce
- **Przekroczenie** (bust) wg reguł: poniżej zera, zostanie 1, albo zero bez
  double → runda anulowana, wynik wraca
- Statystyki: średnia na 3 lotki, najwyższy rzut, liczba 180

## Trening celności

Wybierasz pole (np. 20), rzucasz serie i widzisz ile faktycznie trafiasz:
procent trafień w pole, procent trebli, średnia na lotkę i na rundę,
najdłuższa seria. Każda zakończona seria trafia do historii.

## Wprowadzanie

Jedna lotka = jedno kliknięcie. Klawiatura **1–20**, przed cyfrą **×2** albo
**×3** dla double/treble, do tego **25**, **BULL** i **PUDŁO**.
**Cofnij** działa także po zmianie gracza.

Ekran nie gaśnie w trakcie gry.

## Instalacja na iPhonie

1. Otwórz link w **Safari**
2. Przycisk udostępniania (kwadrat ze strzałką)
3. **Dodaj do ekranu początkowego**

Od tej pory działa jak zwykła aplikacja, także bez internetu.

## Uruchomienie lokalnie

```bash
python3 -m http.server 8899
```

Potem `http://localhost:8899`.

## Jak to zrobione

Jeden plik HTML, czysty JavaScript, zero zależności i zero narzędzi do budowania.
Wyniki i ustawienia zapisują się w przeglądarce (localStorage).

Podpowiedzi wyjścia nie są wklepaną tabelą — appka przeszukuje wszystkie
kombinacje maksymalnie trzech lotek kończące się na double i wybiera tę, którą
faktycznie gra się przy tarczy (chętnie T20, niechętnie bull po drodze).
Zweryfikowane: 17 z 19 popularnych wyjść zgodnych ze standardowymi tabelami,
a wyniki bez możliwego wyjścia (169, 168, 166, 165, 163, 162, 159) poprawnie
rozpoznane.
