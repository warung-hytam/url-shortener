import { z } from 'zod';

const formSchema = z.object({
  url: z.string().regex(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/, {
    message: 'Invalid URL format: must start with http:// or https:// and contain valid characters',
  }),
  duration: z
    .string()
    // 5-digit cap keeps `Nd` inside the Date range; the presets cover everything shorter
    .regex(/^(3h|12h|1d|7d|[1-9]\d{0,4}d)$/, {
      message: 'Duration must be a preset (3h, 12h, 1d, 7d) or 1-99999 days (e.g. 45d)',
    })
    .optional()
    .or(z.literal('')),
  alias: z
    .string()
    .regex(/^[A-Za-z_0-9]+$/, {
      message: 'Alias must contain only letters (a-z and A-Z) or numbers (0-9) or underscores (_)',
    })
    .optional()
    .or(z.literal('')),
});

export default formSchema;
