import { Module } from "@nestjs/common";
import { default_db } from "./connections/default.db";
import { secondary_db } from "./connections/rac_bmw.db";

@Module({
    imports: [...default_db, ...secondary_db]
})

export class DatabaseModule {}