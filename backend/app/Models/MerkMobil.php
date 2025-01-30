<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MerkMobil extends Model
{
    use HasFactory;
    public $table = 'merk_mobil';
    public $incrementing = false;

    // Set primary key type ke string
        protected $keyType = 'string';
    protected $guarded = ['id'];
    // Override boot function untuk men-generate UUID secara otomatis
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid(); // generate UUID
            }
        });
    }

    public function merk(){
        return $this->hasMany(Mobil::class, 'id_brand');
    }

    public function actor(){
        return $this->belongsTo(User::class, 'id_actor');
    }
}
