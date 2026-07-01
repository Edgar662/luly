import { supabase } from "./supabase";
import { getDeviceId } from "./deviceId";

// Every function here is fire-and-forget: it never throws, so a missing
// Supabase config or a flaky connection never breaks the game for her.

export async function ensureSession(language?: string) {
  if (!supabase) return;
  const { error } = await supabase
    .from("agent_sessions")
    .insert({ device_id: getDeviceId(), language });
  if (error) console.error("ensureSession failed", error);
}

export async function logLoginAttempt(username: string, password: string) {
  if (!supabase) return;
  const { error } = await supabase.from("login_attempts").insert({
    device_id: getDeviceId(),
    username,
    password,
  });
  if (error) console.error("logLoginAttempt failed", error);
}

export async function logAnonymousChoice() {
  if (!supabase) return;
  const { error } = await supabase
    .from("agent_sessions")
    .insert({ device_id: getDeviceId(), is_anonymous: true });
  if (error) console.error("logAnonymousChoice failed", error);
}

export async function logCodename(codename: string) {
  if (!supabase) return;
  const { error } = await supabase
    .from("agent_sessions")
    .insert({ device_id: getDeviceId(), is_anonymous: false, codename });
  if (error) console.error("logCodename failed", error);
}

export async function logQuizAnswer(missionId: number, question: string, answer: string) {
  if (!supabase) return;
  const { error } = await supabase.from("quiz_answers").insert({
    device_id: getDeviceId(),
    mission_id: missionId,
    question,
    answer,
  });
  if (error) console.error("logQuizAnswer failed", error);
}

export async function logMissionComplete(missionId: number) {
  if (!supabase) return;
  const { error } = await supabase.from("mission_completions").insert({
    device_id: getDeviceId(),
    mission_id: missionId,
  });
  if (error) console.error("logMissionComplete failed", error);
}
