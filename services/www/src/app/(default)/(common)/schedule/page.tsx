import { LiveSchedule } from "@/types/schedule";

function fetchSchedule(): Promise<{
  data: LiveSchedule | null;
  error: Error | null;
}> {
  const now = new Date();
  const todayZeroDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const url =
    `http://localhost:${process.env.PORT || '80'}/api/schedule?`
    + (new URLSearchParams({
        afterAt: now.toString(),
        beforeAt: (new Date(todayZeroDate.getTime() + (1000 * 60 * 60 * 24 * 7))).toString(),
        includeInProgressLive: String(true),
      })).toString();

  return fetch(url, { cache: 'no-cache' })
    .then(resp => {
      if(!resp.ok) throw new Error(resp.status.toString());
      else return (resp.json() as unknown) as LiveSchedule;
    })
    .then(data => ({
      data,
      error: null,
    }))
    .catch((err: Error) => {
      console.error('schedule req', err);
      return {
        data: null,
        error: err,
      };
    });
};

export default async function SchedulePage() {
  const {
    data: schedule,
    error: scheduleError,
  } = await fetchSchedule();

  return (
    <>
      <pre><code>{JSON.stringify(schedule, null, 2)}</code></pre>
    </>
  );
}
