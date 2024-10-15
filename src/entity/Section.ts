import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Course } from './Course';
import { Lesson } from './Lesson';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lessons!: Lesson[];

  @Column()
  name!: string;

  @Column('integer')
  total_time!: number;

  @Column('integer')
  total_lesson!: number;

  @Column({ type: 'bigint' })
  course_id!: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  constructor(sectionData?: Partial<Section>) {
    sectionData && Object.assign(this, sectionData);
  }
}