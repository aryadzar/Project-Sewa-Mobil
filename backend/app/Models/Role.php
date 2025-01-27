<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    public $table = 'role';
    public $incrementing = false;

    // Set primary key type ke string
    protected $keyType = 'string';

    // Override boot function untuk men-generate UUID secara otomatis
    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($model) {
    //         if (!$model->getKey()) {
    //             $model->{$model->getKeyName()} = (string) Str::uuid(); // generate UUID
    //         }
    //     });
    // }

    public function setrole(){
        return $this->hasMany(SetRole::class, 'id_role');
    }
}
