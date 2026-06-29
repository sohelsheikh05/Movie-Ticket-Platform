// services/seatLock.service.js

import redis from "../config/redis.js";
import { getIO } from "../config/socket.js";
import { AppError } from "../libs/Error.js";

class SeatLockService {

    static async lockSeats(showId, seatIds, userId) {

        const lockedKeys = [];

        try {

            for (const seatId of seatIds) {

                const key = `lock:${showId}:${seatId}`;

                const result = await redis.set(
                    key,
                    userId,
                    "EX",
                    600,
                    "NX"
                );

                if (!result)
                    throw new AppError(`Seat ${seatId} already locked`);

                lockedKeys.push(key);
            }

            getIO().to(`show:${showId}`).emit("seatLocked", {
                seats: seatIds
            });

            return true;

        } catch (err) {

            for (const key of lockedKeys)
                await redis.del(key);
            console.log(err)
            throw err;
        }

    }

    static async unlockSeats(showId, seatIds, userId = null) {

        const unlocked = [];

        for (const seatId of seatIds) {

            const key = `lock:${showId}:${seatId}`;

            if (userId) {

                const owner = await redis.get(key);

                if (owner !== userId)
                    continue;

            }

            await redis.del(key);

            unlocked.push(seatId);

        }

        if (unlocked.length) {

            getIO().to(`show:${showId}`).emit("seatUnlocked", {
                seats: unlocked
            });

        }

    }

}

export default SeatLockService;