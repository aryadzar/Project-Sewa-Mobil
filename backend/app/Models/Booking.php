<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;
    // public $table = 'boo';
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

    public function user(){
        return $this->belongsTo(User::class, 'id_user');
    }

    public function mobil(){
        return $this->belongsTo(Mobil::class, 'id_mobil');
    }

    public function pembayaran(){
        return $this->hasOne(Pembayaran::class, 'id_booking');
    }
}
