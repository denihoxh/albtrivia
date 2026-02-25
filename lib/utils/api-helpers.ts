import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 32);
const nanoidShort = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 24);

export function successResponse(data: any, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(error: string, hint: string, status: number) {
  return NextResponse.json({ success: false, error, hint }, { status });
}

export function generateApiKey(): string {
  return `albtrivia_${nanoid()}`;
}

export function generateClaimToken(): string {
  return `claim_${nanoidShort()}`;
}

export function extractApiKey(header: string | null): string | null {
  if (!header) return null;
  return header.replace('Bearer ', '').trim() || null;
}

export const QUESTIONS = [
  { q: "What is the capital of Albania?", options: ["Tirana","Shkodër","Vlorë","Durrës"], answer: "Tirana" },
  { q: "What does 'Shqipëri' roughly translate to?", options: ["Land of Eagles","Mountain Kingdom","Land of the Sun","Ancient Realm"], answer: "Land of Eagles" },
  { q: "Albania declared independence from the Ottoman Empire in which year?", options: ["1878","1912","1920","1944"], answer: "1912" },
  { q: "Which Albanian national hero fought the Ottoman Empire in the 15th century?", options: ["Ismail Qemali","Fan Noli","Gjergj Kastrioti (Skanderbeg)","Mehmed Ali"], answer: "Gjergj Kastrioti (Skanderbeg)" },
  { q: "What is 'byrek' in Albanian cuisine?", options: ["A meat stew","A flaky pastry","A fermented drink","A grilled lamb dish"], answer: "A flaky pastry" },
  { q: "Which city is known as 'the City of a Thousand Windows'?", options: ["Tirana","Berat","Gjirokastër","Korçë"], answer: "Berat" },
  { q: "The Albanian concept of 'Besa' refers to what?", options: ["A sacred oath of honor","A traditional dance","A mountain fortress","A tribal council"], answer: "A sacred oath of honor" },
  { q: "What is the traditional Albanian folk dance called?", options: ["Hora","Valle","Kolo","Syrtos"], answer: "Valle" },
  { q: "Which city is a UNESCO site known as Albania's 'City of Stone'?", options: ["Berat","Gjirokastër","Shkodër","Elbasan"], answer: "Gjirokastër" },
  { q: "Mother Teresa was of Albanian descent. What was her original surname?", options: ["Bojaxhiu","Delvina","Xhuvani","Marku"], answer: "Bojaxhiu" },
  { q: "What is 'raki' in Albania?", options: ["A traditional greeting","A fruit brandy","A type of bread","A card game"], answer: "A fruit brandy" },
  { q: "Albanian belongs to which language family branch?", options: ["Slavic","Romance","Its own Indo-European branch","Hellenic"], answer: "Its own Indo-European branch" },
  { q: "Which lake is shared by Albania, North Macedonia, and Greece?", options: ["Lake Shkodër","Lake Pogradec","Lake Ohrid","Lake Prespa"], answer: "Lake Ohrid" },
  { q: "What is 'Kanun' in Albanian tradition?", options: ["A type of flute","A traditional code of laws","A wedding ceremony","A mountain pass"], answer: "A traditional code of laws" },
  { q: "Albania joined NATO in which year?", options: ["1999","2004","2009","2014"], answer: "2009" },
  { q: "What is 'tave kosi'?", options: ["A lamb and yogurt baked dish","A cold soup","A stuffed pepper dish","A type of cheese"], answer: "A lamb and yogurt baked dish" },
  { q: "The Albanian national football team's nickname is?", options: ["The Eagles","The Lions","The Falcons","The Bears"], answer: "The Eagles" },
  { q: "Which port city is Albania's second largest?", options: ["Shkodër","Vlorë","Durrës","Korçë"], answer: "Durrës" },
  { q: "What two-headed symbol appears on Albania's flag?", options: ["A dragon","A black eagle","A golden lion","A silver wolf"], answer: "A black eagle" },
  { q: "Which ancient king is considered a founding hero of the Illyrians?", options: ["Pyrrhus","Bardyllis","Gentius","Agron"], answer: "Agron" },
];

export const ROUND_DURATION = 30;
